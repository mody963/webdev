import type { Request, Response } from 'express';
import { GrinderScale} from "../models/GrinderScale.js";
import { AppDataSource } from "../data-source.js";

const grinderScaleRepository = AppDataSource.getRepository(GrinderScale);

async function showReservations(req: Request, res: Response) {
    const reservations = await grinderScaleRepository.find();
    res.render("reservations", { reservations });
}

function showAddReservation(req: Request, res: Response) {
    res.render("add-reservation", { message: null });
}

async function handleAddReservation(req: Request, res: Response) {
    // Extract data from the parsed body
    const data = req.body;

    if ( typeof data.grinderScale !== "string" || !data.grinderScale.trim()) 
        {
            res.status(400).send("Grinder or scale is required");
            return;
        }
    
    const grinderScale = new GrinderScale(data.grinderScale.trim())
    // Create and add the new tasting
    await grinderScaleRepository.save(grinderScale)
    
    // Render the page again with a success message
    res.render("add-reservation", { message: "Grinder/Scale successfully added!" });
}

export { showReservations, showAddReservation, handleAddReservation };
