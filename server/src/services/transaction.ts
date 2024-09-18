import { Transaction } from "shared";
import db, { Tables } from "../utils/db";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return db<Transaction>(Tables.Transactions).select("*");
};

export const getTransactionById = async (
  id: number
): Promise<Transaction | undefined> => {
  return db<Transaction>(Tables.Transactions).where({ id }).first();
};

export const createTransaction = async (
  transaction: Transaction
): Promise<number[]> => {
  return db<Transaction>(Tables.Transactions).insert(transaction);
};

export const updateTransaction = async (
  id: number,
  transaction: Partial<Transaction>
): Promise<void> => {
  await db<Transaction>(Tables.Transactions).where({ id }).update(transaction);
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await db<Transaction>(Tables.Transactions).where({ id }).delete();
};
