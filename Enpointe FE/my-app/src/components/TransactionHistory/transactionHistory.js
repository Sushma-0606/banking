import React, { useState } from "react";
import "./style.css"; // Import the CSS file
import WithdrawModal from "./withdrawalModal";
import { useNavigate } from "react-router-dom";


const TransactionHistory = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
    const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/bankerLogin");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="container">
        <div className="buttons">
          <button className="btn deposit">Deposit</button>
          <button className="btn withdraw" onClick={toggle}>
            Withdraw
          </button>
          {/* <button className="btn refresh">
            <i className="bx bx-arrow-from-left"></i>
          </button> */}
          <button
            className="btn btn-danger ml-auto"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>

        <h2 className="title">Transaction History</h2>

        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction Type</th>
              <th>Amount (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>deposit</td>
              <td>10</td>
            </tr>
            <tr>
              <td>withdrawal</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <WithdrawModal modal={modal} toggle={() => toggle()} />
      </div>
    </div>
  );
};

export default TransactionHistory;
