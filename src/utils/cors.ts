import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize the CORS middleware
const cors = Cors({
  origin: '*', // Allow all origins (use specific domains in production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
});

// Helper function to run middleware in Next.js API routes
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (req: NextApiRequest, res: NextApiResponse, callback: (result?: unknown) => void) => void
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
