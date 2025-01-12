import { apiHandler } from '@/utils/apiHandler';
import cors, { runMiddleware } from '@/utils/cors';
import { getAllTransactions, addTransaction, updateTransaction, getTransactionById, getAllTransactionsByVin, getLatestUnfinishedTransactionByVin } from '@/services/transactionService';

export default apiHandler(async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    const { id, vin, unfinished } = req.query;
		
		// Fetch transaction by ID
    if (id) {
      if (isNaN(Number(id))) {
        return res.status(400).json({ error: 'id must be a number.' });
      }
      const transaction = await getTransactionById(Number(id));
      return res.status(200).json(transaction);
    }

		// Fetch latest unfinished transaction by VIN
    if (vin && unfinished) {
      const latestUnfinishedTransaction = await getLatestUnfinishedTransactionByVin(vin as string);
      return res.status(200).json(latestUnfinishedTransaction);
    }

		// Fetch all transactions by VIN
    if (vin) {
      const transactionsByVin = await getAllTransactionsByVin(vin as string);
      return res.status(200).json(transactionsByVin);
    }
    
    // Fetch all transactions
    const allTransactions = await getAllTransactions();
    return res.status(200).json(allTransactions);
  }

  if (req.method === 'POST') {
    const transaction = req.body;
    const newTransaction = await addTransaction(transaction);
    return res.status(201).json(newTransaction);
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const transactionData = req.body;

    if (!id || typeof id !== 'number') {
      return res.status(400).json({ error: 'Masukkan identitas plat nomor kendaraan!' });
    }

    const updatedTransaction = await updateTransaction(id, transactionData);  
    res.status(200).json({ message: 'Status diperbarui', updatedTransaction });

    try {
      
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  res.status(405).json({ error: 'Method Not Allowed' });
});
