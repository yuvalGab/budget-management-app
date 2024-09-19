import { Typography } from "antd";
import Page from "../components/Page";
import TransactionStats from "../components/TransactionStats";

const { Title } = Typography;

function Dashboard() {
  return (
    <Page>
      <Title level={3}>Transaction Statistics</Title>
      <TransactionStats />
    </Page>
  );
}

export default Dashboard;
