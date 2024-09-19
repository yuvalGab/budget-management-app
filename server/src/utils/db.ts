import knex from "knex";

export enum Tables {
  Transactions = "transactions",
}

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./budget.sqlite",
  },
  useNullAsDefault: true,
});

db.schema.hasTable(Tables.Transactions).then((exists) => {
  if (!exists) {
    return db.schema
      .createTable(Tables.Transactions, (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("info").nullable();
        table.decimal("amount").notNullable();
        table.date("date").notNullable();
        table.integer("type").notNullable();
      })
      .then(() => {
        console.log(`${Tables.Transactions} table created`);
      })
      .catch((error) => {
        console.error(`Error creating ${Tables.Transactions} table`, error);
      });
  }
});

export default db;
