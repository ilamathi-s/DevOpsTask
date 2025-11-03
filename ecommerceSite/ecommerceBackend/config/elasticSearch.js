import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();
export const client = new Client({
  node: process.env.EL_NODE,
  auth: {
    username: process.env.EL_USER,
    password: process.env.EL_PASS
  },
   tls: {
    rejectUnauthorized: false 
  }
});
export default client;