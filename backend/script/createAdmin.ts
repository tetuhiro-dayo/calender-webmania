import "dotenv/config";
import bcrypt from "bcryptjs";
import UserModel from "../src/models/User";

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

async function createAdmin() {
    const password = "admin";
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userId = await UserModel.create({
        username: "admin",
        password_hash: hash,
        is_admin: true,
    });

    console.log(`Admin user created with ID: ${userId}`);
}

createAdmin();
