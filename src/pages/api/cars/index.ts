import { apiHandler } from '@/utils/apiHandler';
import cors, { runMiddleware } from '@/utils/cors';
import { getAllCars, addCar, updateCar, getCarById } from '@/services/carService';

export default apiHandler(async (req, res) => {
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    const { vin } = req.query;
    
    if(vin){
      if (typeof vin !== 'string') {
        return res.status(400).json({ error: 'VIN must be a string.' });
      }
      const car = await getCarById(vin);
      return res.status(200).json(car);
    }
    else{
      const cars = await getAllCars();
      return res.status(200).json(cars);
    }
  }

  if (req.method === 'POST') {
    const car = req.body;
    const newCar = await addCar(car);
    return res.status(201).json(newCar);
  }

  if (req.method === 'PUT') {
    const { vin } = req.query;
    const carData = req.body;

    if (!vin || typeof vin !== 'string') {
      return res.status(400).json({ error: 'Masukkan identitas plat nomor kendaraan!' });
    }

    const updatedCar = await updateCar(vin, carData);  
    res.status(200).json({ message: 'Status diperbarui', updatedCar });

    try {
      
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  res.status(405).json({ error: 'Method Not Allowed' });
});
