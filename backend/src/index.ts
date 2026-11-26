// src/index.ts
import "reflect-metadata";
import express from "express";
import type { Request, Response, NextFunction } from 'express';

import path from "node:path";
import { fileURLToPath } from "node:url";

import homeRouter from "./routes/home.routes.js";
import tastingRouter from "./routes/tastings.routes.js";
import grinderRouter from "./routes/grinder.routes.js";
import groupordersRouter from "./routes/grouporders.routes.js";
import shelfRouter from "./routes/shelf.routes.js";
import { AppDataSource } from "./data-source.js";
import { seedTastings, seedShelf } from "./utils/seed.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse POST request bodies
app.use(express.urlencoded({ extended: true }));



app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Mount home routes at root (http://localhost:3000/ and http://localhost:3000/bye)
app.use(homeRouter);

// Mount feature routers
app.use(tastingRouter);      // http://localhost:3000/tastings
app.use(grinderRouter);      // http://localhost:3000/grinder
app.use(groupordersRouter);  // http://localhost:3000/grouporder
app.use("/shelf", shelfRouter); // http://localhost:3000/shelf

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Global error handling van de mmiddleware
// Als er ergens iets fout gaat, komt de fout hier terecht.
// We laten de fout zien in de terminal, zodat we weten wat misging.
// Daarna vertellen we de gebruiker dat er iets fout is gegaan.
// Als de fout geen eigen foutcode heeft, gebruiken we code 500.
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    console.error("Error:", err);
    res.status(err.status || 500).send(err.message || "Internal Server Error");
});


AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    await seedTastings();
    await seedShelf();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
