import axios from "axios";
import React, { useState } from "react";

const AddExpence = () => {
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

      let url = "http://localhost:5000/createexpence";
      let response = await axios.post(url, obj);

      console.log("Response:", response.data);
      alert("Expense added successfully!");

      setCategory("");
      setIncTitle("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handalIncome}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-purple-600 mb-6 text-center">
          Add Transaction
        </h2>

       
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value="Expense"
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 focus:outline-none"
          >
            <option>Expense</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            value={incTitle}
            onChange={(e) => setIncTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

      
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

   
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

      
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90 transition-all"
        >
          ✓ Done
        </button>
      </form>
    </div>
  );
};

export default AddExpence;
