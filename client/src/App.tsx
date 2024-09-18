import styled from "styled-components";
import { Flex, Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TransactionDetail from "./pages/TransactionDetail";
import AppFooter from "./components/AppFooter";

const { Content } = Layout;

const AppContainer = styled(Flex)`
  height: 100vh;
`;

const AppContent = styled(Content)`
  height: 100%;
  overflow-x: hidden;
`;

function App() {
  return (
    <AppContainer vertical>
      <AppHeader />
      <AppContent>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:id" element={<TransactionDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppContent>
      <AppFooter />
    </AppContainer>
  );
}

export default App;
