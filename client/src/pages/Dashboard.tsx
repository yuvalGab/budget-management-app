import { Button, Flex, Typography } from "antd";
import Page from "../components/Page";
import TransactionStats from "../components/TransactionStats";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../components/AppRouter";

const { Title } = Typography;

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Page>
      <Flex justify="space-between" align="center" style={{ margin: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          Transaction Statistics
        </Title>
        <Button
          type="primary"
          style={{ margin: 16 }}
          onClick={() => {
            navigate(RoutePath.Transactions);
          }}
        >
          Show Transactions
        </Button>
      </Flex>
      <TransactionStats />
    </Page>
  );
}

export default Dashboard;
