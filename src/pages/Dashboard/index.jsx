import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

 
  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return console.log("No userId found in localStorage");

        const res = await axios.post("http://localhost:5000/getIncome", { userId });
        const data = res.data.data || [];
        setIncomes(data);

        const total = data.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        setTotalIncome(total);
      } catch (error) {
        console.log("Error fetching income:", error.message);
      }
    };

    fetchIncome();
  }, []);

 
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return console.log("No userId found in localStorage");

        const res = await axios.post("http://localhost:5000/getexpence", { userId });
        const data = res.data.data || [];
        setExpenses(data);

        const total = data.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        setTotalExpense(total);
      } catch (error) {
        console.log("Error fetching expense:", error.message);
      }
    };

    fetchExpense();
  }, []);

  useEffect(() => {
    setBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  const COLORS = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA"];
  const chartData = expenses.map((exp) => ({
    name: exp.incTitle || "Expense",
    value: Number(exp.amount) || 0,
  }));




  let navigate = useNavigate();

  return (
  
      <div className="min-h-screen bg-gray-50 text-gray-800">
       
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
          <h1 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
            <span>💰</span> EasyExpense
          </h1>
          <div className="flex items-center gap-3">
            <p className="font-medium">Ayan Habib</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile"
              className="w-9 h-9 rounded-full"
            />
          </div>
        </header>
    
       
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50">
  <button
    onClick={() => navigate("/addIncome")}
    className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow transition"
  >
    + Add Income
  </button>
  <button
    onClick={() => navigate("/addExpence")}
    className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow transition"
  >
    + Add Expense
  </button>
</div>
    
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          <div className="col-span-full flex flex-wrap gap-4 justify-between">
            <div className="bg-white p-5 rounded-2xl shadow w-[250px]">
              <p className="text-sm text-gray-500">Balance</p>
              <p className="text-2xl font-bold">${balance}</p>
            </div>
    
            <div className="bg-white p-5 rounded-2xl shadow w-[250px]">
              <p className="text-sm text-gray-500">Income</p>
              <p className="text-2xl font-bold text-green-600">${totalIncome}</p>
            </div>
    
            <div className="bg-white p-5 rounded-2xl shadow w-[250px]">
              <p className="text-sm text-gray-500">Expense</p>
              <p className="text-2xl font-bold text-red-500">${totalExpense}</p>
            </div>
    
            <div className="bg-white p-5 rounded-2xl shadow w-[250px]">
              <p className="text-sm text-gray-500">Savings</p>
              <p className="text-2xl font-bold text-blue-600">${balance}</p>
            </div>
          </div>
    
          {/* Pie Chart */}
          <div className="bg-white p-5 rounded-2xl shadow col-span-1">
            <h3 className="font-semibold mb-3">Spending Breakdown</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No expenses yet</p>
            )}
          </div>
    
          {/* Transactions */}
          <div className="bg-white p-5 rounded-2xl shadow col-span-2">
            <h3 className="font-semibold mb-3 text-indigo-600">
              Your Transactions
            </h3>
            <div className="divide-y">
              {[...incomes.map((i) => ({ ...i, type: "income" })),
              ...expenses.map((e) => ({ ...e, type: "expense" }))]
    
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <div>
                      <p className="font-medium">{item.incTitle}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p
                      className={`font-bold ${
                        item.type === "income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {item.amount}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    );
      // );
};

export default Dashboard;
