// src/controllers/api/tasting.controller.ts
import type { Request, Response } from "express";
import { Like } from "typeorm";
import { AppDataSource } from "../../data-source.js";
import { Tasting } from "../../models/Tasting.js";

const tastingRepository = AppDataSource.getRepository(Tasting);

export async function getAllTastings(req: Request, res: Response) {
  const filters: any = {};

  if (req.query.status) {
    filters.status = String(req.query.status);
  }

  if (req.query.title) {
    filters.title = Like(`%${String(req.query.title)}%`);
  }

  const tastings = await tastingRepository.find({
    where: filters,
    relations: { scores: true },
  });

  res.json(tastings);
}

export async function getSingleTasting(req: Request, res: Response) {
  const tastingId = Number(req.params.id);

  const tasting = await tastingRepository.findOne({
    where: { id: tastingId },
    relations: { scores: true },
  });

  if (!tasting) {
    res.status(404).json({ message: "Tasting not found" });
    return;
  }

  res.json(tasting);
}

export async function createTasting(req: Request, res: Response) {
  const { title, host, dateTime, capacity, lineup } = req.body;
  const parsedCapacity = Number(capacity);

  if (
    !title?.trim() ||
    !host?.trim() ||
    !dateTime ||
    !lineup?.trim() ||
    !Number.isFinite(parsedCapacity) ||
    parsedCapacity < 2 ||
    parsedCapacity > 12
  ) {
    res.status(400).json({
      message: "Invalid tasting data: title, host, dateTime, lineup, and capacity (2–12) are required.",
    });
    return;
  }

  const newTasting = new Tasting(
    title.trim(),
    host.trim(),
    dateTime,
    parsedCapacity,
    lineup.trim()
  );

  const savedTasting = await tastingRepository.save(newTasting);
  res.status(201).json(savedTasting);
}

export async function signUpMember(req: Request, res: Response) {
  const tastingId = Number(req.params.id);
  const { memberName } = req.body;

  if (!memberName?.trim()) {
    res.status(400).json({ message: "memberName is required" });
    return;
  }

  const tasting = await tastingRepository.findOneBy({ id: tastingId });
  if (!tasting) {
    res.status(404).json({ message: "Tasting not found" });
    return;
  }

  const cleanName = memberName.trim();
  if (
    tasting.confirmedAttendees.includes(cleanName) ||
    tasting.waitingList.includes(cleanName)
  ) {
    res.status(400).json({ message: "Member is already signed up for this tasting" });
    return;
  }

  if (tasting.confirmedAttendees.length < tasting.capacity) {
    tasting.confirmedAttendees.push(cleanName);
  } else {
    tasting.waitingList.push(cleanName);
  }

  const updatedTasting = await tastingRepository.save(tasting);
  res.json(updatedTasting);
}