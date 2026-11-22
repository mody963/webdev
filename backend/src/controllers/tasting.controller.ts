import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Tasting } from "../models/Tasting.js";

const tastingRepository = AppDataSource.getRepository(Tasting);

async function showTastings(req: Request, res: Response) {
  const tastings = await tastingRepository.find({
    relations: { scores: true }, // Automatically joins CuppingScores
  });
  res.render("tastings", { tastings });
}

async function showSingleTasting(req: Request, res: Response) {
  const id = Number(req.params.id);
  const tasting = await tastingRepository.findOne({
    where: { id },
    relations: { scores: true },
  });

  if (!tasting) {
    res.status(404).send("Tasting not found"); // Prevent EJS crash on null
    return;
  }

  res.render("tasting-detail", { tasting });
}

function showAddTastingPage(req: Request, res: Response) {
  res.render("add-tasting", { message: null });
}

async function handleAddTasting(req: Request, res: Response) {
  const { title, host, dateTime, capacity, lineup } = req.body;
  const parsedCapacity = Number(capacity);

  // Input validation
  if (!title?.trim() || !host?.trim() || !dateTime || !lineup?.trim()) {
    res.status(400).send("All fields (title, host, date/time, and lineup) are required.");
    return;
  }

  if (Number.isNaN(parsedCapacity) || parsedCapacity < 2 || parsedCapacity > 12) {
    res.status(400).send("Capacity must be a valid number between 2 and 12.");
    return;
  }

  const newTasting = new Tasting(
    title.trim(),
    host.trim(),
    dateTime,
    parsedCapacity,
    lineup.trim()
  );

  await tastingRepository.save(newTasting);
  res.render("add-tasting", { message: "Tasting session successfully added!" });
}

export { showTastings, showSingleTasting, showAddTastingPage, handleAddTasting };