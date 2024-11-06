// src/index.ts

import express, { Request, Response } from 'express';

const app = express();
const port: number = 3000; // Explicitly specify types

// Middleware to parse JSON data
app.use(express.json());

// Simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Node.js with TypeScript!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
