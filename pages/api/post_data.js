
export default function handler(request, response) {
  if (request.method === 'POST') {
    // Extract data from the request body
    const { name, email, message } = request.body;

    // Basic validation
    if (!name || !email || !message) {
      return response.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Process the data (e.g., save to a database, send an email, etc.)
    // For demonstration, we'll just log it and send a success response.
    console.log('Received data:', { name, email, message });

    return response.status(201).json({ success: 'Data submitted successfully!', receivedData: { name, email, message } });
  } else {
    // Handle any other HTTP method (e.g., GET, PUT, DELETE)
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${req.method} Not Allowed`);
  }
}