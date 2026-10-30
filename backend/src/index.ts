// src/index.ts
import express from "express";
import type { Request, Response, NextFunction } from 'express';
import homeRouter from "./routes/home.routes.js";
import tastingRouter from "./routes/tastings.routes.js";
import grinderRouter from "./routes/grinder.routes.js";
import groupordersRouter from "./routes/grouporders.routes.js";
import shelfRouter from "./routes/shelf.routes.js";

const app = express();
const PORT = 3000;

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
app.use(shelfRouter);        // http://localhost:3000/shelf

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});




//            VOORBEELD

// import express from "express";
// import homeRouter from "./routes/homeroutes.js"
// import productRouter from "./routes/product.route.js"
// import type { Request, Response, NextFunction } from 'express';

// import path from "node:path";
// import { fileURLToPath } from "node:url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 3000;

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// app.use(express.urlencoded({extended: true}))

// app.use((req: Request, res: Response, next: NextFunction) => {
// console.log(`Request: ${req.method} ${req.url}`);
// next(); // without this, the request would stop here
// })

// app.use(homeRouter)
// app.use("/shop" , productRouter)

// app.use( (req: Request, res: Response) => {
// res.status(404).send("404 not found!");
// });

// app.listen(PORT, () => {
// console.log(`Server running at http://localhost:${PORT}`);
// });
