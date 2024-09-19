import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import TransactionDetail from "../pages/TransactionDetail";

export enum RoutePath {
  Dashboard = "/",
  Transactions = "/transactions",
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path={RoutePath.Dashboard} element={<Dashboard />} />
        <Route path={RoutePath.Transactions} element={<Transactions />} />
        <Route
          path={`/${RoutePath.Transactions}/:id`}
          element={<TransactionDetail />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
