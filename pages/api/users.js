// pages/api/users.js
import fs from "fs";
import path from "path";

/**
 * Finds the largest 'id' value from an array of objects.
 * Assumes the JSON data is an array of objects, where each object
 * has a numeric 'id' property.
 *
 * @param {Array<Object>} jsonData - The parsed JSON data (an array of objects).
 * @returns {number | null} The largest 'id' found, or null if the array is empty
 *                          or no valid 'id' properties are found.
 */
function getLargestIdFromJson(jsonData) {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    return null; // Handle empty or invalid input
  }

  let largestId = null;

  for (const entry of jsonData) {
    if (typeof entry === 'object' && entry !== null && typeof entry.id === 'number') {
      if (largestId === null || entry.id > largestId) {
        largestId = entry.id;
      }
    }
  }

  return largestId;
}

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(fileContents);

  if (req.method === "GET") {
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const newUser = req.body;
    if (!newUser || !newUser.name || !newUser.school) {
      return res.status(400).json({ error: "Name and school are required." });
    }
    // Generate a new ID for the user
    const largestId = getLargestIdFromJson(users);
    newUser.id = largestId !== null ? largestId + 1 : 1;
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      res.status(204).end();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
