import { AppDataSource } from "../data-source.js";
import { Tasting } from "../models/Tasting.js";
import { CuppingScore } from "../models/CuppingScore.js";

export async function seedTastings() {
  const tastingRepository = AppDataSource.getRepository(Tasting);
  const scoreRepository = AppDataSource.getRepository(CuppingScore);

  const count = await tastingRepository.count();
  if (count > 0) return; // Already seeded

  const winterCupping = new Tasting(
    "Winter Cupping 2026",
    "Mo",
    "2026-11-28T19:30",
    6,
    "Geisha, Worka, Chelbesa, Finca Betulia"
  );
  const savedTasting = await tastingRepository.save(winterCupping);

  const sampleScore = new CuppingScore(
    "Mo (Host)",
    "Geisha",
    9.1,
    "Bergamot and jasmine notes",
    savedTasting
  );
  await scoreRepository.save(sampleScore);

  console.log("Seeded Tastings and CuppingScores");
}