import { Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "./AppRouter";

const { Title } = Typography;

function TransactionDetails() {
  const navigate = useNavigate();

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          Transaction Details
        </Title>
        <Button
          type="primary"
          onClick={() => {
            navigate(RoutePath.Transactions);
          }}
        >
          Return To Transactions
        </Button>
      </Flex>
    </>
  );
}

export default TransactionDetails;
