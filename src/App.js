import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import CreateAccount from "./pages/CreateAccount";
import Transactions from "./pages/Transactions";
import TransferCenter from "./pages/TransferCenter";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/accounts/create" element={<CreateAccount />} />

        <Route path="/transactions/:id" element={<Transactions />} />

        <Route path="/transfer" element={<TransferCenter />} />
        <Route path="/transfer/deposit" element={<Deposit />} />
        <Route path="/transfer/withdraw" element={<Withdraw />} />
        <Route path="/transfer/send" element={<Transfer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
