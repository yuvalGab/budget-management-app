import { Route, Routes } from "react-router-dom";
import Page from "../components/Page";
import TransactionsTable from "../components/TransactionsTable";
import TransactionDetails from "../components/TransactionDetails";

function Transactions() {
  return (
    <Page>
      <Page>
        <Routes>
          <Route path="/" element={<TransactionsTable />} />
          <Route path=":id" element={<TransactionDetails />} />
        </Routes>
      </Page>
    </Page>
  );
}

export default Transactions;
