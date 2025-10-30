import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./Routes/AuthRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Expenses from "./pages/income";
// import Exc from "./pages/expense";
import AddExpence from "./pages/AddExpence";
import AddIncome from "./pages/addIncome";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="exc" element={<Exc />} /> */}
          <Route path="/addExpence" element={<AddExpence />} />
          <Route path="/addIncome" element={<AddIncome />} />



        </Route>
      </Routes>
    </>
  );
}

export default App;