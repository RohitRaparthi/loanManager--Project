import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import "./LoanApplication.css";  // Import the CSS file for custom styles

const LoanApplication = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    loanAmount: "",
    loanTenure: "",
    employmentStatus: "",
    employmentAddress: "",
    employmentAddress2: "",
    reasonForLoan: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the loan application to an API
    console.log("Loan application submitted:", formData);
    navigate("/user/dashboard");
  };

  return (
    <div className="loan-application-container">
      <Header title="Apply for Loan" toggleSidebar={() => setShowSidebar(!showSidebar)} />

      <main className="form-container">
        <div className="form-content">
          <h1 className="form-title">APPLY FOR A LOAN</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full name as it appears on bank account</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="loanAmount">How much do you need?</label>
                <input
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  placeholder="Enter amount in naira"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="loanTenure">Loan tenure (in months)</label>
                <input
                  type="number"
                  id="loanTenure"
                  name="loanTenure"
                  value={formData.loanTenure}
                  onChange={handleChange}
                  placeholder="Enter loan duration"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="employmentStatus">Employment status</label>
                <input
                  type="text"
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  placeholder="Enter employment status"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reasonForLoan">Reason for loan</label>
              <textarea
                id="reasonForLoan"
                name="reasonForLoan"
                value={formData.reasonForLoan}
                onChange={handleChange}
                rows={4}
                placeholder="Explain why you need this loan"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="employmentAddress">Employment address</label>
                <input
                  type="text"
                  id="employmentAddress"
                  name="employmentAddress"
                  value={formData.employmentAddress}
                  onChange={handleChange}
                  placeholder="Enter employment address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="employmentAddress2">Employment address</label>
                <input
                  type="text"
                  id="employmentAddress2"
                  name="employmentAddress2"
                  value={formData.employmentAddress2}
                  onChange={handleChange}
                  placeholder="Enter additional address info"
                />
              </div>
            </div>

            <div className="terms-and-conditions">
              <div>
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleCheckboxChange}
                  required
                />
                <label htmlFor="agreeToTerms">
                  I have read the important information and accept that by completing this application I will be bound by the terms and conditions.
                </label>
              </div>

              <p className="disclaimer">
                Any personal and credit information provided may be disclosed from time to time to credit bureaus, credit reference, or other reporting agencies.
              </p>
            </div>

            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoanApplication;
