import { AppDataSource } from "../data-source.js";
import { Tasting } from "../models/Tasting.js";
import { CuppingScore } from "../models/CuppingScore.js";

import { User } from "../models/User.js";
import { CoffeeBag } from "../models/CoffeeBag.js";

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

export async function seedShelf() {
    const userRepository = AppDataSource.getRepository(User);
    const coffeeBagRepository = AppDataSource.getRepository(CoffeeBag);

    const count = await userRepository.count();
    if (count > 0) return; // Already seeded

    // Create users
    const daan = await userRepository.save({
        name: "Willem"
    });

    const sara = await userRepository.save({
        name: "Sara"
    });

    // Create coffee bags
    await coffeeBagRepository.save([
        {
            ownerId: daan.id,
            bean: "Geisha",
            roaster: "Manhattan Coffee",
            grams: 250,
            bagFreshness: "Fresh",
            finished: false
        },
        {
            ownerId: sara.id,
            bean: "Bourbon",
            roaster: "Bocca",
            grams: 500,
            bagFreshness: "Fresh",
            finished: false
        }
    ]);

    console.log("Seeded Users and CoffeeBags");
}
