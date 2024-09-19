import { Typography } from "antd";
import Page from "../components/Page";
import TransactionsTable from "../components/TransactionsTable";

const { Title } = Typography;

function Transactions() {
  return (
    <Page>
      <Title level={3}>Transactions</Title>
      <TransactionsTable />
    </Page>
  );
}

export default Transactions;
