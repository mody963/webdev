
import type { Request, Response } from 'express';
import { AppDataSource } from "../data-source.js";
import { GroupOrder} from "../models/GroupOrder.js";

const groupOrderRepository = AppDataSource.getRepository(GroupOrder);

async function showGroupOrders(req: Request, res: Response) {
    // haalt de grouporders op uit de db met .find() beetje t zelfde als SELECT * FROM group_order
    const groupOrders = await groupOrderRepository.find();
    res.render("group-orders", { groupOrders });
}

function showAddGroupOrderPage(req: Request, res: Response) {
    res.render("add-group-order", { message: null });
}

async function handleAddGroupOrder(req: Request, res: Response) {
    const data = req.body;
    // onderdeel stap 7 voeg of gegevens geldig zijn voor database structuur. 
    const beanId = Number(data.beanId);
    const starterId = Number(data.starterId);
    const minimumGrams = Number(data.minimumGrams);

    if (
        !Number.isInteger(beanId) ||
        beanId <= 0 ||
        !Number.isInteger(starterId) ||
        starterId <= 0 ||
        !Number.isInteger(minimumGrams) ||
        minimumGrams <= 0 ||
        !data.closingDate
    ) {
        res.status(400).send("Invalid group order data");
        return;
    }

    // Create en add the new group order
    const groupOrder = new GroupOrder(
        beanId,
        starterId,
        minimumGrams,
        data.closingDate
    );
    await groupOrderRepository.save(groupOrder);

    // Render pagina met succes message
    res.render("add-group-order", { message: "Group order successfully added!" });
}

export { showGroupOrders, showAddGroupOrderPage, handleAddGroupOrder };