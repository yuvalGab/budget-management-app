import express from "express";
import cors from "cors";
import transactionsRoutes from "./routes/transaction";
import "./utils/db";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
