import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tasting } from "./models/Tasting.js";
import { GroupOrder } from "./models/GroupOrder.js";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "database.sqlite",
  synchronize: true, // Automatically creates/updates tables during development
  entities: [Tasting, GroupOrder], // fernando, daan moeten hun enteties toevoegen
});
