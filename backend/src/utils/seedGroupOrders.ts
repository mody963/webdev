import { AppDataSource } from "../data-source.js";
import { GroupOrder } from "../models/GroupOrder.js";
import { GroupOrderShare } from "../models/GroupOrderShare.js";
import { User } from "../models/User.js";

async function seedGroupOrders() {

    const groupOrderRepository =
        AppDataSource.getRepository(GroupOrder);

    const shareRepository =
        AppDataSource.getRepository(GroupOrderShare);

    const userRepository =
        AppDataSource.getRepository(User);

    const count = await groupOrderRepository.count();

    if (count > 0) return;

    const users = await userRepository.find({
        order: { id: "ASC" },
        take: 2
    });

    if (users.length < 2) {
        console.log("Not enough users to seed group orders");
        return;
    }

    const closingDate = new Date();
    closingDate.setDate(closingDate.getDate() + 14);


    const groupOrder = new GroupOrder(
        1,
        users[0]!.id,
        1000,
        closingDate.toISOString().split("T")[0]!
    );

    await groupOrderRepository.save(groupOrder);


    const share1 = new GroupOrderShare(200);

    share1.groupOrder = groupOrder;
    share1.member = users[0]!;

    await shareRepository.save(share1);


    const share2 = new GroupOrderShare(300);

    share2.groupOrder = groupOrder;
    share2.member = users[1]!;

    await shareRepository.save(share2);

    console.log("Seeded GroupOrders and GroupOrderShares");
}

export { seedGroupOrders };
