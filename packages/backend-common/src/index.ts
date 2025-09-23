import dotenv from "dotenv";
//import { Client } from "pg";

dotenv.config();

// const password = process.env.PostgresSQL_Pass;
// export const client = new Client({
//   user: "postgres",
//   password,
//   host: "localhost",
//   port: 5432,
//   database: process.env.PostgresSQL_DB_Name,
// });

export const JWT_SECRETE= process.env.JWT_SECRETE || "defaultSecret";
