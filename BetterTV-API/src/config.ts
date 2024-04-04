import * as dotenv from "dotenv";
import { Configs } from "./entities/entities";

dotenv.config();

const configs: Configs = {
  PORT: Number(process.env.PORT) || 5000,
  API_VERSION: "0.0.1",
};

export default configs;
