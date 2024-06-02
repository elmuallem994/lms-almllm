"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const database = new client_1.PrismaClient();
async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Engineering" },
                { name: "Filming" },
            ],
        });
    }
    catch (error) {
        console.log("Error seeding the database categories", error);
    }
    finally {
        await database.$disconnect();
    }
}
main();
