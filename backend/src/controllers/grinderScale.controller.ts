import type { Request, Response } from 'express';
import { GrinderScale, getAllReservations, addReservation } from "../models/GrinderScale.js";

function showReservations(req: Request, res: Response) {
    // Render the tastings.ejs view and pass the  array
    res.render("reservations", { tastings: getAllReservations() });
}

function showAddReservation(req: Request, res: Response) {
    res.render("add-reservation", { message: null });
}

function handleAddReservation(req: Request, res: Response) {
    // Extract data from the parsed body
    const data = req.body;
    
    // Create and add the new tasting
    addReservation(new GrinderScale(data.id, data.grinderScale));
    
    // Render the page again with a success message
    res.render("add-reservation", { message: "Grinder/Scale successfully added!" });
}

export { showReservations, showAddReservation, handleAddReservation };
