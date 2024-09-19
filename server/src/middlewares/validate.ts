import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const transactionValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("info").optional().isString(),
    body("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
    body("date")
      .notEmpty()
      .withMessage("Date is required")
      .isISO8601()
      .withMessage("Date must be a valid ISO8601 date"),
    body("type")
      .isInt({ min: 0, max: 1 })
      .withMessage("Type must be either 0 (Income) or 1 (Expense)"),
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};
