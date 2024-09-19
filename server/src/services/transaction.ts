import { Transaction } from "shared";
import db, { TableName } from "../utils/db";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return db<Transaction>(TableName.Transactions).select("*");
};

export const getTransactionById = async (
  id: number
): Promise<Transaction | undefined> => {
  return db<Transaction>(TableName.Transactions).where({ id }).first();
};

export const createTransaction = async (
  transaction: Transaction
): Promise<number[]> => {
  return db<Transaction>(TableName.Transactions).insert(transaction);
};

export const updateTransaction = async (
  id: number,
  transaction: Transaction
): Promise<void> => {
  await db<Transaction>(TableName.Transactions).where({ id }).update(transaction);
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await db<Transaction>(TableName.Transactions).where({ id }).delete();
};
