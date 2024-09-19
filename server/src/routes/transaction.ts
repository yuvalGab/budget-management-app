import express from "express";
import * as transactionsController from "../controllers/transaction";
import { validate } from "../middlewares/validate";

const router = express.Router();

router.get("/", transactionsController.getAllTransactions);
router.get("/:id", transactionsController.getTransactionById);
router.post("/", validate, transactionsController.createTransaction);
router.put("/:id", validate, transactionsController.updateTransaction);
router.delete("/:id", transactionsController.deleteTransaction);

export default router;
