import { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { Button, Flex, Table, Typography } from "antd";
import { Transaction, TransactionType } from "shared";
import transactionStore from "../store/transaction";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "./AppRouter";

const { Text } = Typography;

function TransactionsTable() {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        key: "name",
        dataIndex: "name",
        title: "Name",
        sorter: (a: Transaction, b: Transaction): number =>
          a.name.localeCompare(b.name),
        render: (value: string, record: Transaction): JSX.Element => (
          <Button
            type="link"
            onClick={() => {
              navigate(`${RoutePath.Transactions}/${record.id}`);
            }}
          >
            {value}
          </Button>
        ),
      },
      {
        key: "amount",
        dataIndex: "amount",
        title: "Amount",
        sorter: (a: Transaction, b: Transaction): number => a.amount - b.amount,
        render: (value: number, record: Transaction) => {
          return (
            <Text
              style={{
                color: record.type === TransactionType.Income ? "green" : "red",
              }}
            >
              {value}
            </Text>
          );
        },
      },
      {
        key: "date",
        dataIndex: "date",
        title: "Date",
        sorter: (a: Transaction, b: Transaction): number =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
        render: (value: string): JSX.Element => {
          return <>{format(value, "dd/LL/yyyy")}</>;
        },
      },
      {
        title: "Actions",
        render: () => (
          <>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Flex justify="end">
        <Button
          type="link"
          onClick={() => {
            navigate(RoutePath.Dashboard);
          }}
        >
          Return to dashboard
        </Button>
      </Flex>
      <Table
        rowKey={"id"}
        dataSource={transactionStore.transactions}
        columns={columns}
        showSorterTooltip={{ placement: "bottom" }}
      />
    </>
  );
}

export default observer(TransactionsTable);
