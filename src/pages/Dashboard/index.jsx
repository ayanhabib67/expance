
import axios from "axios";
import React, { useState } from "react";

const Dashboard = () => {
  const [category, setCategory] = useState("");
  const [incTitle, setIncTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");



const handalIncome = async (e) => {
    e.preventDefault();
  
    try {
     
      let user_Id = localStorage.getItem("userId");
  
     
      let obj = {
        category,
        incTitle,
        amount,
        date,
        userId: user_Id, 
      };

      console.log(user_Id);
      
  
      let url = "http://localhost:5000/createIncome";
      let response = await axios.post(url, obj);
  
      console.log("Response:", response.data);
      alert("Income added successfully!");
  
     
      setCategory("");
      setIncTitle("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.log("error", error.message);
    }
  };
  


  return (
    <>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Income Title"
        value={incTitle}
        onChange={(e) => setIncTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handalIncome}>Add Income</button>
    </>
  );
};

export default Dashboard;
