import { useCallback, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Flex, Space, Table, Typography } from "antd";
import { Transaction, TransactionType } from "shared";
import transactionStore from "../store/transaction";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "./AppRouter";
import TransactionModal, { TransactionModalMode } from "./TransactionModal";

const { Title, Text } = Typography;

function TransactionsTable() {
  const navigate = useNavigate();
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [transactionModalMode, setTransactionModalMode] = useState(
    TransactionModalMode.Create
  );
  const [selectedRecord, setSelectedRecord] = useState();

  useEffect(() => {
    transactionStore.getTransactions();
  }, []);

  const openTransactionModal = useCallback(
    (mode: TransactionModalMode, record?: Transaction) => {
      setTransactionModalMode(mode);
      setSelectedRecord(record as any);
      setIsTransactionModalVisible(true);
    },
    []
  );

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
        key: "type",
        dataIndex: "type",
        title: "Type",
        sorter: (a: Transaction, b: Transaction): number => a.amount - b.amount,
        render: (value: number, record: Transaction) => {
          return (
            <Text
              style={{
                color: record.type === TransactionType.Income ? "green" : "red",
              }}
            >
              {value === TransactionType.Expense ? "Expense" : "Income"}
            </Text>
          );
        },
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
        render: (value: string) => {
          return <>{format(value, "dd/LL/yyyy")}</>;
        },
      },
      {
        title: "Actions",
        render: (_value: unknown, record: Transaction) => (
          <Space>
            <Button
              onClick={() => {
                openTransactionModal(TransactionModalMode.Update, record);
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                transactionStore.deleteTransaction(record.id!);
              }}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <Title level={3} style={{ margin: 0 }}>
          Transactions
        </Title>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              openTransactionModal(TransactionModalMode.Create);
            }}
          >
            Create Transaction
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate(RoutePath.Dashboard);
            }}
          >
            Return To Dashboard
          </Button>
        </Space>
      </Flex>
      <Table
        rowKey={"id"}
        dataSource={transactionStore.transactions}
        columns={columns}
        showSorterTooltip={{ placement: "bottom" }}
      />
      <TransactionModal
        visible={isTransactionModalVisible}
        mode={transactionModalMode}
        values={selectedRecord}
        onCancel={() => {
          setIsTransactionModalVisible(false);
        }}
      />
    </>
  );
}

export default observer(TransactionsTable);
