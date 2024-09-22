import styled from "styled-components";
import { Flex, Layout } from "antd";
import AppErrorBoundary from "./components/AppErrorBoundary";
import AppHeader from "./components/AppHeader";
import AppRouter from "./components/AppRouter";
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
    <AppErrorBoundary>
      <AppContainer vertical>
        <AppHeader />
        <AppContent>
          <AppRouter />
        </AppContent>
        <AppFooter />
      </AppContainer>
    </AppErrorBoundary>
  );
}

export default App;
