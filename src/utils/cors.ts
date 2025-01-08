﻿import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  origin: '*', // Allow all origins (restrict to specific domains in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
});

// Helper function to run middleware in Next.js API routes
export function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
