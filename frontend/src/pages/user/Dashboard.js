import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Search } from "lucide-react";
import Header from "../../components/header";
import './Dashboard.css'; // Importing the custom CSS file

const UserDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Header title="Dashboard" toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <main className="main-content">
        <div className="content-wrapper">
          <div className="balance-card">
            <div className="balance-header">
              <div className="balance-info">
                <DollarSign className="balance-icon" size={24} />
                <div>
                  <div className="balance-text">BALANCE</div>
                  <div className="balance-amount">₦ 0.0</div>
                </div>
              </div>

              <button onClick={() => navigate("/user/apply")} className="loan-button">
                Get A Loan
              </button>
            </div>

            <div className="action-buttons">
              <button className="action-btn">Borrow Cash</button>
              <button className="action-btn">Transact</button>
              <button className="action-btn">Deposit Cash</button>
            </div>
          </div>

          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search for loans"
              className="search-input"
            />
          </div>

          <div className="loans-table">
            <div className="table-header">
              <h2>Applied Loans</h2>
              <div className="table-actions">
                <button className="table-btn">Sort</button>
                <button className="table-btn">Filter</button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="loan-table">
                <thead>
                  <tr>
                    <th>Loan Officer</th>
                    <th>Amount</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Repeat for each loan */}
                  <tr>
                    <td className="loan-officer">
                      <div className="officer-info">
                        <img src="/placeholder.svg?height=32&width=32" alt="John Okoh" className="officer-img" />
                        <div>
                          <div className="officer-name">John Okoh</div>
                          <div className="contact-time">Contact 1 day ago</div>
                        </div>
                      </div>
                    </td>
                    <td>10,000.00</td>
                    <td>June 09, 2021</td>
                    <td className="loan-status pending">PENDING</td>
                    <td className="action-btn-cell">
                      <button className="action-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                  {/* Repeat for more loans */}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <div>
                Rows per page:
                <select className="pagination-select">
                  <option>7</option>
                  <option>10</option>
                  <option>25</option>
                </select>
              </div>

              <div>1-3 of 3</div>

              <div className="pagination-buttons">
                <button className="pagination-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="pagination-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
