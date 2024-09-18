import express from "express";
import * as transactionsController from "../controllers/transaction";

const router = express.Router();

router.get("/", transactionsController.getAllTransactions);
router.get("/:id", transactionsController.getTransactionById);
router.post("/", transactionsController.createTransaction);
router.put("/:id", transactionsController.updateTransaction);
router.delete("/:id", transactionsController.deleteTransaction);

export default router;
