
import type { Request, Response } from 'express';
import { GroupOrder, getAllGroupOrders, addGroupOrder } from "../models/GroupOrder.js";

function showGroupOrders(req: Request, res: Response) {
    // Render the group-orders.ejs view and pass the array
    res.render("group-orders", { groupOrders: getAllGroupOrders() });
}

function showAddGroupOrderPage(req: Request, res: Response) {
    res.render("add-group-order", { message: null });
}

function handleAddGroupOrder(req: Request, res: Response) {
    const data = req.body;

    // Create en add the new group order
    addGroupOrder(new GroupOrder(
        Number(data.id),
        Number(data.beanId),
        Number(data.starterId),
        Number(data.minimumGrams),
        data.closingDate
    ));

    // Render pagina met succes message
    res.render("add-group-order", { message: "Group order successfully added!" });
}

export { showGroupOrders, showAddGroupOrderPage, handleAddGroupOrder };


// net als mo de database temp dinges
/*
import { AppDataSource } from "../data-source.js";
import { GroupOrder } from "../models/GroupOrder.js";

// Haal alle groepsbestellingen op uit SQLite
async function showGroupOrders(req: Request, res: Response) {
    const groupOrderRepository = AppDataSource.getRepository(GroupOrder);

    const groupOrders = await groupOrderRepository.find();

    res.render("group-orders", { groupOrders });
}

// Sla een nieuwe groepsbestelling op in SQLite
async function handleAddGroupOrder(req: Request, res: Response) {
    const data = req.body;

    const groupOrderRepository = AppDataSource.getRepository(GroupOrder);

    const groupOrder = groupOrderRepository.create({
        beanId: Number(data.beanId),
        starterId: Number(data.starterId),
        minimumGrams: Number(data.minimumGrams),
        closingDate: data.closingDate,
        status: "open"
    });

    await groupOrderRepository.save(groupOrder);

    res.render("add-group-order", {
        message: "Group order successfully added!"
    });
}
*/


// Wat doet deze code?
// - getRepository(GroupOrder) geeft toegang tot de GroupOrder-tabel.
// - .find() haalt alle groepsbestellingen op uit SQLite.
// - .create() maakt een nieuw GroupOrder-object aan.
// - .save() slaat de groepsbestelling op in de database.
// - async en await zorgen ervoor dat we op databasebewerkingen wachten.
