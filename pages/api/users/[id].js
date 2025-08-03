// pages/api/users/[id].js
import fs from "fs";

export default async function handler(req, res) {

  const path = require('path');
 
  const filePath = path.join(process.cwd(), "data", "users.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(fileContents);
  // console.log(`Parsed users: ${JSON.stringify(users)}`);

  // PUT, PATCH, DELETE requests provide a query string parameter `id`
  // to identify which user to update or delete.
  const { id } = req.query; // Get the ID from the dynamic route parameter
  

  if (req.method === 'PUT' ) {
    const { id, ...updatedUser } = req.body;
    console.log(`Request method: ${req.method}, User ID: ${id} typeof id: ${typeof id}, updatedUser: ${JSON.stringify(updatedUser)} typeof updatedUser: ${typeof updatedUser} `);
    try {
      console.log("req body",req.body)
      const { id,name } = req.body; // Assuming the body contains name and description
      console.log(`Updating user with ID: ${id}, Name: ${name}`);
      // In a real application, you would update your database here
      // For demonstration, we'll just log the update

      const userIndex = users.findIndex((user) => user.id === Number(id));
      console.log(`User index found: ${userIndex}`);
      if (userIndex !== -1) {
        // console.log(`User before update: {JSON.stringify(...users[userIndex]})`);        
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        console.log(users[userIndex]);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        res.status(200).json(users[userIndex]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: `User ${id} updated successfully` });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ message: 'Failed to update item' });
    }
  }
  else if (req.method === 'PATCH' ) {
    const { ...updatedUser } = req.body;
    try {
      console.log("id: ",id," req body",req.body)
      console.log(`req body: ${JSON.stringify(req.body)}`);

      console.log(`Updating user with ID: ${id}, body: ${req.body}`);
      // In a real application, you would update your database here
      // For demonstration, we'll just log the update

      const userIndex = users.findIndex((user) => user.id === Number(id));
      console.log(`User index found: ${userIndex}`);
      if (userIndex !== -1) {
        // console.log(`User before update: {JSON.stringify(...users[userIndex]})`);        
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        console.log(users[userIndex]);
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        res.status(200).json(users[userIndex]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: `User ${id} updated successfully` });
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ message: 'Failed to update item' });
    }
  }
  else if (req.method === 'DELETE') {
    const userIndex = users.findIndex((user) => user.id === Number(id));
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      res.status(204).end();
      console.log(`User with ID ${id} deleted successfully.`);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
  else {
    // Handle other HTTP methods or return a 405 Method Not Allowed
    res.setHeader('Allow', ['PUT','PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}