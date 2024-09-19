import React, { useCallback, useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useForm, Controller } from "react-hook-form";
import { isValid as isDateFnsValid } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { Transaction, TransactionType } from "shared";
import { observer } from "mobx-react-lite";
import transactionStore from "../store/transaction";

export enum TransactionModalMode {
  Create,
  Update,
}

interface TransactionModalProps {
  visible: boolean;
  mode: TransactionModalMode;
  onCancel: () => void;
  values?: Transaction;
}

const defaultValues: Transaction = {
  name: "",
  info: "",
  amount: 1,
  date: new Date().toISOString(),
  type: TransactionType.Income,
};

const TransactionModal: React.FC<TransactionModalProps> = ({
  visible,
  mode,
  onCancel,
  values,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting, errors },
  } = useForm<Transaction>({
    defaultValues: values || defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (values) {
      reset({
        ...values,
        date:
          values.date && isDateFnsValid(new Date(values.date))
            ? values.date
            : undefined,
      });
    }
  }, [values, reset]);

  const onFormSubmit = useCallback(
    (values: Transaction) => {
      const formattedValues = {
        ...values,
        amount: +values.amount,
        date: values.date
          ? new Date(values.date).toISOString()
          : new Date().toISOString(),
      };

      switch (mode) {
        case TransactionModalMode.Create:
          transactionStore.createTransaction(formattedValues).then(onCancel);
          return;
        case TransactionModalMode.Update:
          transactionStore
            .updateTransaction(formattedValues.id!, formattedValues)
            .then(onCancel);
          return;
        default:
          return;
      }
    },
    [mode]
  );

  return (
    <Modal
      title={
        mode === TransactionModalMode.Update
          ? "Update Transaction"
          : "Create Transaction"
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit(onFormSubmit)}
      okButtonProps={{
        disabled: !isValid || isSubmitting,
        loading: transactionStore.loading,
      }}
    >
      <Form layout="vertical">
        <Form.Item
          label="Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name ? errors.name.message : ""}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Info"
          validateStatus={errors.info ? "error" : ""}
          help={errors.info ? errors.info.message : ""}
        >
          <Controller
            name="info"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Amount"
          validateStatus={errors.amount ? "error" : ""}
          help={errors.amount ? errors.amount.message : ""}
        >
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              validate: (value) => value > 0 || "Amount must be greater than 0",
            }}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Date"
          validateStatus={errors.date ? "error" : ""}
          help={errors.date ? errors.date.message : ""}
        >
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <DatePicker
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date: Dayjs | null) => {
                  field.onChange(date ? date.toISOString() : "");
                }}
              />
            )}
          />
        </Form.Item>
        <Form.Item
          label="Type"
          validateStatus={errors.type ? "error" : ""}
          help={errors.type ? errors.type.message : ""}
        >
          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <Select {...field}>
                <Select.Option value={TransactionType.Income}>
                  Income
                </Select.Option>
                <Select.Option value={TransactionType.Expense}>
                  Expense
                </Select.Option>
              </Select>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default observer(TransactionModal);
