import { useCallback, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Flex, Table, Tooltip, Typography } from "antd";
import { Transaction, TransactionType } from "shared";
import transactionStore from "../store/transaction";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "./AppRouter";
import { PlusOutlined } from "@ant-design/icons";
import TransactionModal, { TransactionModalMode } from "./TransactionModal";

const { Text } = Typography;

function TransactionsTable() {
  const navigate = useNavigate();
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [transactionModalMode, setTransactionModalMode] = useState(
    TransactionModalMode.Create
  );
  const [selectedRecord, setSelectedRecord] = useState();

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
          <>
            <Button
              onClick={() => {
                openTransactionModal(TransactionModalMode.Update, record);
              }}
            >
              Edit
            </Button>
            <Button>Delete</Button>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        style={{ margin: "16px 0px" }}
      >
        <Tooltip title="Create transaction" placement="right">
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => {
              openTransactionModal(TransactionModalMode.Create);
            }}
          />
        </Tooltip>
        <Button
          type="primary"
          onClick={() => {
            navigate(RoutePath.Dashboard);
          }}
        >
          Return To Dashboard
        </Button>
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
