import React, { useState } from "react";
import { Wallet, PiggyBank, User } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/header";
import StatCard from "../../components/StatCard";
import LoanTable from "../../components/LoanTable";
import "./VerifierDashboard.css"; // import the CSS

const VerifierDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [loans, setLoans] = useState([
    {
      id: "1",
      user: {
        name: "Tom Cruise",
        avatar: "/placeholder.svg?height=40&width=40",
        activity: "Contact Email not Linked",
      },
      date: "June 08, 2021",
      time: "12:42 PM",
      status: "pending",
      details: "Contact Email not Linked",
    },
    {
      id: "2",
      user: {
        name: "Matt Damon",
        avatar: "/placeholder.svg?height=40&width=40",
        activity: "Adding Images to Featured Posts",
      },
      date: "June 09, 2021",
      time: "8:30 AM",
      status: "pending",
      details: "Adding Images to Featured Posts",
    },
    {
      id: "3",
      user: {
        name: "Robert Downey",
        avatar: "/placeholder.svg?height=40&width=40",
        activity: "When will I be charged this month?",
      },
      date: "June 08, 2021",
      time: "10:15 AM",
      status: "pending",
      details: "When will I be charged this month?",
    },
    {
      id: "4",
      user: {
        name: "Christian Bale",
        avatar: "/placeholder.svg?height=40&width=40",
        activity: "Payment not going through",
      },
      date: "June 08, 2021",
      time: "3:00 PM",
      status: "pending",
      details: "Payment not going through",
    },
    {
      id: "5",
      user: {
        name: "Henry Cavil",
        avatar: "/placeholder.svg?height=40&width=40",
        activity: "Unable to add replies",
      },
      date: "June 08, 2021",
      time: "5:20 PM",
      status: "verified",
      details: "Unable to add replies",
    },
    {
      id: "6",
      user: {
        name: "Chris Evans",
        avatar: "/placeholder.svg?height=40&width=40",
        activity: "Downtime since last week",
      },
      date: "June 08, 2021",
      time: "9:45 AM",
      status: "verified",
      details: "Downtime since last week",
    },
    {
      id: "7",
      user: {
        name: "Sam Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        activity: "Referral Bonus",
      },
      date: "June 08, 2021",
      time: "11:30 AM",
      status: "pending",
      details: "Referral Bonus",
    },
  ]);

  const handleStatusChange = (id, status) => {
    setLoans((prevLoans) => prevLoans.map((loan) => (loan.id === id ? { ...loan, status } : loan)));
  };

  return (
    <div className="dashboard-container">
      {showSidebar && (
        <div className="sidebar-container">
          <Sidebar role="verifier" />
        </div>
      )}

      <div className="main-container">
        <Header title="Dashboard" toggleSidebar={() => setShowSidebar(!showSidebar)} />

        <main className="main-content">
          <div className="content-container">
            <div className="header">
              <h1 className="main-title">Dashboard</h1>
              <span className="separator">-</span>
              <h2 className="sub-title">Loans</h2>
            </div>

            <div className="stat-cards">
              <StatCard icon={<Wallet size={24} />} value="50" label="Loans" />
              <StatCard icon={<User size={24} />} value="100" label="Borrowers" />
              <StatCard icon={<Wallet size={24} />} value="550,000" label="Cash Disbursed" />
            </div>

            <div className="stat-cards">
              <StatCard icon={<PiggyBank size={24} />} value="450,000" label="Savings" />
              <StatCard icon={<User size={24} />} value="30" label="Repaid Loans" />
              <StatCard icon={<Wallet size={24} />} value="1,000,000" label="Cash Received" />
            </div>

            <div className="loan-table-container">
              <LoanTable loans={loans} role="verifier" onStatusChange={handleStatusChange} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VerifierDashboard;
