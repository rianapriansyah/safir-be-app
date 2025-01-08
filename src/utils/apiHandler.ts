import type { NextApiRequest, NextApiResponse } from 'next';
import cors, { runMiddleware } from '@/utils/cors';

export function apiHandler(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Apply CORS middleware
      await runMiddleware(req, res, cors);
      await handler(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
    }
  };
}
