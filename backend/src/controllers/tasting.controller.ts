import type { Request, Response } from 'express';
import { Tasting, getAllTastings, addTasting } from "../models/Tasting.js";

function showTastings(req: Request, res: Response) {
    // Render the tastings.ejs view and pass the  array
    res.render("tastings", { tastings: getAllTastings() });
}

function showAddTastingPage(req: Request, res: Response) {
    res.render("add-tasting", { message: null });
}

function handleAddTasting(req: Request, res: Response) {
    // Extract data from the parsed body
    const data = req.body;
    
    // Create and add the new tasting
    addTasting(new Tasting(data.title, data.host, Number(data.capacity), data.lineup));
    
    // Render the page again with a success message
    res.render("add-tasting", { message: "Tasting session successfully added!" });
}

export { showTastings, showAddTastingPage, handleAddTasting };
