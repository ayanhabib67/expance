import axios from "axios";
import React, { useEffect, useState } from "react";

const Exc = () => {
  const [incomes, setIncomes] = useState([]);
useEffect(() => {
    const fetchIncome = async () => {
      try {
     
        const userId = localStorage.getItem("userId");
  
        if (!userId) {
          console.log("No userId found in localStorage");
          return;
        }
  
        const res = await axios.post("http://localhost:5000/getIncome", {
          userId,
        });
  
        console.log("Fetched incomes:", res.data.data);
        setIncomes(res.data.data);
      } catch (error) {
        console.log("Error fetching income:", error.message);
      }
    };
  
    fetchIncome();
  }, []);
  
  return (
    <>
      <h2>All Incomes</h2>
      {incomes.length > 0 ? (
        incomes.map((inc, index) => (
          <div key={index}>
            <p><strong>Category:</strong> {inc.category}</p>
            <p><strong>Title:</strong> {inc.incTitle}</p>
            <p><strong>Amount:</strong> {inc.amount}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No incomes found</p>
      )}
    </>
  );
};

export default Exc;
