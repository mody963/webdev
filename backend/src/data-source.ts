import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tasting } from "./models/Tasting.js";
import { GroupOrder } from "./models/GroupOrder.js";
import { CuppingScore } from "./models/CuppingScore.js";

import { User } from "./models/User.js";
import { CoffeeBag } from "./models/CoffeeBag.js";
import { TransferRequest } from "./models/TransferRequest.js";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "database.sqlite",
  synchronize: true, // Automatically creates/updates tables during development
  entities: [Tasting, CuppingScore, GroupOrder, User, CoffeeBag, TransferRequest], // fernando moet nog zijn enteties toevoegen
});
