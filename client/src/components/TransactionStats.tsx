import { observer } from "mobx-react-lite";
import { Row, Col, Card } from "antd";
import transactionStore from "../store/transaction";

function TransactionStats() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Card title="Total Income">
          ${transactionStore.totalIncome.toFixed(2)}
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card title="Total Expenses">
          ${transactionStore.totalExpenses.toFixed(2)}
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card title="Remaining Balance">
          ${transactionStore.remainingBalance.toFixed(2)}
        </Card>
      </Col>
    </Row>
  );
}

export default observer(TransactionStats);
