// pages/api/students.js
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
  const filePath = path.join(process.cwd(), "data", "students.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const students = JSON.parse(fileContents);

  if (req.method === "GET") {
    const { id } = req.query;
    if (id !== undefined) {
      // Convert id to number for comparison
      const student = students.find((student) => student.id === Number(id));
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
    } else {
      res.status(200).json(students);
    }
  } else if (req.method === "POST") {
    const newStudent = req.body;
    if (!newStudent || !newStudent.name || !newStudent.school) {
      return res.status(400).json({ error: "Name and school are required." });
    }
    // Generate a new ID for the student
    const largestId = getLargestIdFromJson(students);
    newStudent.id = largestId !== null ? largestId + 1 : 1;
    students.push(newStudent);
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
    res.status(201).json(newStudent);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    const studentIndex = students.findIndex((student) => student.id === id);
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
