import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DollarSign, Search, MoreVertical } from "lucide-react";
import Header from "../../components/header";
import "./UserLoans.css"; // import the new CSS file

const UserLoans = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  const loans = [
    {
      id: "1",
      officer: {
        name: "John Okoh",
        avatar: "/placeholder.svg?height=32&width=32",
        lastContact: "Contact 1 day ago",
      },
      amount: 10000.0,
      date: "June 09, 2021",
      time: "2:40 PM",
      status: "pending",
    },
    {
      id: "2",
      officer: {
        name: "John Okoh",
        avatar: "/placeholder.svg?height=32&width=32",
        lastContact: "Contact 1 day ago",
      },
      amount: 100000.0,
      date: "June 07, 2021",
      time: "9:30 AM",
      status: "approved",
    },
    {
      id: "3",
      officer: {
        name: "John Okoh",
        avatar: "/placeholder.svg?height=32&width=32",
        lastContact: "Contact 1 day ago",
      },
      amount: 100000.0,
      date: "June 07, 2021",
      time: "11:45 AM",
      status: "rejected",
    },
    {
      id: "4",
      officer: {
        name: "John Okoh",
        avatar: "/placeholder.svg?height=32&width=32",
        lastContact: "Contact 3 days ago",
      },
      amount: 100000.0,
      date: "May 27, 2021",
      time: "1:30 PM",
      status: "approved",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <span className="badge badge-yellow">PENDING</span>;
      case "approved":
        return <span className="badge badge-green">APPROVED</span>;
      case "rejected":
        return <span className="badge badge-red">REJECTED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <Header title="Loans" toggleSidebar={() => setShowSidebar(!showSidebar)} />
      <main className="main">
        <div className="card">
          <div className="header">
            <div className="balance">
              <DollarSign className="icon" size={24} />
              <div>
                <div className="balance-label">BALANCE</div>
                <div className="balance-amount">₦ 0.0</div>
              </div>
            </div>
            <button onClick={() => navigate("/user/apply")} className="btn-primary">
              Get A Loan
            </button>
          </div>

          <div className="nav">
            <button className="nav-item">Borrow Cash</button>
            <button className="nav-item">Transact</button>
            <button className="nav-item">Deposit Cash</button>
          </div>
        </div>

        <div className="search">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search for loans"
            className="search-input"
          />
        </div>

        <div className="card">
          <div className="table-header">
            <h2 className="table-title">Applied Loans</h2>
            <div className="table-actions">
              <button className="action-button">Sort</button>
              <button className="action-button">Filter</button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="table">
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
                {loans.map((loan) => (
                  <tr key={loan.id}>
                    <td className="table-cell">
                      <div className="officer-info">
                        <img
                          src={loan.officer.avatar || "/placeholder.svg"}
                          alt={loan.officer.name}
                          className="officer-avatar"
                        />
                        <div className="officer-details">
                          <div className="officer-name">{loan.officer.name}</div>
                          <div className="officer-last-contact">{loan.officer.lastContact}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">{loan.amount.toFixed(2)}</td>
                    <td className="table-cell">
                      <div>{loan.date}</div>
                      <div className="small-text">{loan.time}</div>
                    </td>
                    <td className="table-cell">{getStatusBadge(loan.status)}</td>
                    <td className="table-cell">
                      <button className="more-button">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div>
              Rows per page:
              <select className="rows-select">
                <option>7</option>
                <option>10</option>
                <option>25</option>
              </select>
            </div>

            <div>1-4 of 4</div>

            <div className="pagination-controls">
              <button className="pagination-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="arrow-left" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="pagination-button">
                <svg xmlns="http://www.w3.org/2000/svg" className="arrow-right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLoans;
