import { Button, Descriptions, Flex, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "./AppRouter";
import { observer } from "mobx-react-lite";
import transactionStore from "../store/transaction";
import { useEffect } from "react";
import { TransactionType } from "shared";
import { format } from "date-fns";

const { Title, Text } = Typography;

function TransactionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate(RoutePath.Dashboard);
      return;
    }

    transactionStore.getTransactionById(+id).then(() => {
      if (transactionStore.currentTransaction) {
        return;
      }

      navigate(RoutePath.Dashboard);
    });
  }, [id]);

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
      <Descriptions
        bordered
        column={1}
        items={[
          {
            key: "name",
            label: "Name",
            children: transactionStore.currentTransaction?.name,
          },
          {
            key: "info",
            label: "Info",
            children: transactionStore.currentTransaction?.name,
          },
          {
            key: "type",
            label: "Type",
            children:
              transactionStore.currentTransaction?.type ===
              TransactionType.Expense ? (
                <Text style={{ color: "red" }}>Expense</Text>
              ) : (
                <Text style={{ color: "green" }}>Income</Text>
              ),
          },
          {
            key: "amount",
            label: "Amount",
            children: (
              <Text
                style={{
                  color:
                    transactionStore.currentTransaction?.type ===
                    TransactionType.Expense
                      ? "red"
                      : "green",
                }}
              >
                {transactionStore.currentTransaction?.amount}
              </Text>
            ),
          },
          {
            key: "date",
            label: "Date",
            children:
              transactionStore.currentTransaction?.date &&
              format(transactionStore.currentTransaction?.date, "dd/LL/yyyy"),
          },
        ]}
      />
    </>
  );
}

export default observer(TransactionDetails);
