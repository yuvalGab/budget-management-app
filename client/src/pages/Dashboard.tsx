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
      <Title level={3}>Transaction Statistics</Title>
      <TransactionStats />
      <Flex justify="center">
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
    </Page>
  );
}

export default Dashboard;
