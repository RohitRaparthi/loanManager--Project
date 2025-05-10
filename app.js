const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "loanmanager.db");
const app = express();
app.use(express.json());

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const authenticate = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
    jwt.verify(jwtToken, "SECRET_TOKEN", (error, payload) => {
      if (error) {
        res.status(401).send("Invalid JWT Token");
      } else {
        req.id = payload.id;
        req.role = payload.role;
        next();
      }
    });
  } else {
    res.status(401).send("Invalid JWT Token");
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.role)) {
      return res.status(403).send("Access Denied");
    }
    next();
  };
};

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password)
    return res.status(400).send("All fields are required");

  const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (existingUser) return res.status(400).send("User already exists");

  if (password.length < 6) return res.status(400).send("Password is too short");

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
    name,
    email,
    hashedPassword,
    role || "user",
  ]);
  res.send("User created successfully");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(400).send("Invalid credentials");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return res.status(400).send("Invalid credentials");

  const payload = { id: user.id, role: user.role };
  const jwtToken = jwt.sign(payload, "SECRET_TOKEN");
  res.send({ jwtToken });
});

app.post("/applications", authenticate, authorize("user"), async (req, res) => {
  const { amount, tenure } = req.body;
  await db.run("INSERT INTO applications (user_id, amount, tenure) VALUES (?, ?, ?)", [
    req.userId,
    amount,
    tenure,
  ]);
  res.send("Application created");
});

app.get("/applications/my", authenticate, authorize("user"), async (req, res) => {
  const apps = await db.all("SELECT * FROM applications WHERE user_id = ? ORDER BY createdAt DESC", [
    req.userId,
  ]);
  res.send(apps);
});

app.get("/applications", authenticate, authorize("admin"), async (req, res) => {
  const apps = await db.all(
    "SELECT a.*, u.name, u.email FROM applications a JOIN users u ON a.user_id = u.id ORDER BY a.createdAt DESC"
  );
  res.send(apps);
});

app.patch("/applications/:id/verify", authenticate, authorize("verifier"), async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  if (!['verified', 'rejected'].includes(status)) {
    return res.status(400).send("Invalid status for verifier");
  }
  await db.run("UPDATE applications SET status = ? WHERE id = ?", [status, id]);
  res.send("Application status updated");
});

app.patch("/applications/:id/approve", authenticate, authorize("admin"), async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).send("Invalid status for admin");
  }

  const appData = await db.get("SELECT * FROM applications WHERE id = ?", [id]);
  if (!appData) return res.status(404).send("Application not found");
  if (appData.status !== "verified") {
    return res.status(400).send("Only verified applications can be approved or rejected by admin");
  }

  await db.run("UPDATE applications SET status = ? WHERE id = ?", [status, id]);
  res.send("Application approved/rejected");
});
