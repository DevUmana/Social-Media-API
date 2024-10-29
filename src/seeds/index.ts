import db from "../config/connection.js";
import { User } from "../models/index.js";
import cleanDB from "./cleanDB.js";

try {
  await db();
  await cleanDB();

  // add users to the collection and await the results
  await User.create({
    username: "devUmana",
    email: "dumana92@gmail.com",
    thoughts: [],
    friends: [],
  });

  // Log out the seed data to indicate what should appear in the database
  console.info("Seeding complete! 🌱");
  process.exit(0);
} catch (error) {
  console.error("Error seeding database:", error);
  process.exit(1);
}
