// pages/api/students/[id].js
import fs from "fs";

export default async function handler(req, res) {

  const path = require('path');
 
  const filePath = path.join(process.cwd(), "data", "students.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const students = JSON.parse(fileContents);
  // console.log(`Parsed students: ${JSON.stringify(students)}`);

  // PUT, PATCH, DELETE requests provide a query string parameter `id`
  // to identify which student to update or delete.
  const { id } = req.query; // Get the string ID from the dynamic route parameter
  console.log('id: ',id)
  if (req.method === 'GET') {
     const studentIndex = students.findIndex((student) => student.id === Number(id));
     console.log('studentIndex: ',studentIndex)
     console.log('students[studentIndex]: ',students[studentIndex])
     if (studentIndex !== -1) {
      res.status(200).json(students[studentIndex]);
      console.log(`Student with ID ${id} returned.`);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  }
  else if (req.method === 'PUT' ) {
    const { id, ...updatedStudent } = req.body;
    console.log(`Request method: ${req.method}, Student ID: ${id} typeof id: ${typeof id}, updatedStudent: ${JSON.stringify(updatedStudent)} typeof updatedStudent: ${typeof updatedStudent} `);
    try {
      console.log("req body",req.body)
      const { id,name } = req.body; // Assuming the body contains name and description
      console.log(`Updating student with ID: ${id}, Name: ${name}`);
      // In a real application, you would update your database here
      // For demonstration, we'll just log the update

      const studentIndex = students.findIndex((student) => student.id === Number(id));
      console.log(`Student index found: ${studentIndex}`);
      if (studentIndex !== -1) {
        // console.log(`Student before update: {JSON.stringify(...students[studentIndex]})`);        
        students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
        console.log(students[studentIndex]);
        fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
        res.status(200).json(students[studentIndex]);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
      res.status(200).json({ message: `Student ${id} updated successfully` });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ message: 'Failed to update item' });
    }
  }
  else if (req.method === 'PATCH' ) {
    const { ...updatedStudent } = req.body;
    try {
      console.log("id: ",id," req body",req.body)
      console.log(`req body: ${JSON.stringify(req.body)}`);

      console.log(`Updating student with ID: ${id}, body: ${req.body}`);
      // In a real application, you would update your database here
      // For demonstration, we'll just log the update

      const studentIndex = students.findIndex((student) => student.id === Number(id));
      console.log(`Student index found: ${studentIndex}`);
      if (studentIndex !== -1) {
        // console.log(`Student before update: {JSON.stringify(...students[studentIndex]})`);        
        students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
        console.log(students[studentIndex]);
        fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
        res.status(200).json(students[studentIndex]);
      } else {
        res.status(404).json({ error: "Student not found" });
      }
      res.status(200).json({ message: `Student ${id} updated successfully` });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ message: 'Failed to update item' });
    }
  }
  else if (req.method === 'DELETE') {
    const studentIndex = students.findIndex((student) => student.id === Number(id));
    if (studentIndex !== -1) {
      students.splice(studentIndex, 1);
      fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
      res.status(204).end();
      console.log(`Student with ID ${id} deleted successfully.`);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  }
  else {
    // Handle other HTTP methods or return a 405 Method Not Allowed
  res.setHeader('Allow', ['GET','PUT','PATCH','DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}