import React from "react";
import transactionsSvg from "../assets/accept.png"; 

const NoTransactions = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
        marginTop: "2rem"
      }}
    >
      <img 
        src={transactionsSvg} 
        style={{ width: "200px", margin: "1rem", opacity: 0.8 }} 
        alt="No Transactions"
      />
      <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#888", fontWeight: "600" }}>
        You Have No Transactions Currently
      </p>
    </div>
  );
};

export default NoTransactions;