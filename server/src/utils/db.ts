import knex from "knex";

export enum TableName {
  Transactions = "transactions",
}

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./budget.sqlite",
  },
  useNullAsDefault: true,
});

db.schema.hasTable(TableName.Transactions).then((exists) => {
  if (!exists) {
    return db.schema
      .createTable(TableName.Transactions, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("info").notNullable().defaultTo("");
        table.decimal("amount").notNullable();
        table.date("date").notNullable();
        table.integer("type").notNullable();
      })
      .then(() => {
        console.log(`${TableName.Transactions} table created`);
      })
      .catch((error) => {
        console.error(`Error creating ${TableName.Transactions} table`, error);
      });
  }
});

export default db;
