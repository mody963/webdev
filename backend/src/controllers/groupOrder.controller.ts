
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
    // Extract data from the parsed body
    const data = req.body;

    // Create and add the new group order
    addGroupOrder(new GroupOrder(
        Number(data.id),
        Number(data.beanId),
        Number(data.starterId),
        Number(data.minimumGrams),
        data.closingDate
    ));

    // Render the page again with a success message
    res.render("add-group-order", { message: "Group order successfully added!" });
}

export { showGroupOrders, showAddGroupOrderPage, handleAddGroupOrder };
