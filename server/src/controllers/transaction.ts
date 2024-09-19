import { Request, Response } from "express";
import * as transactionsService from "../services/transaction";
import { Transaction } from "shared";

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await transactionsService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await transactionsService.getTransactionById(Number(id));
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const newTransaction: Transaction = req.body;
    const [id] = await transactionsService.createTransaction(newTransaction);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTransaction: Transaction = req.body;
    await transactionsService.updateTransaction(Number(id), updatedTransaction);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await transactionsService.deleteTransaction(Number(id));
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete transaction" });
  }
};
