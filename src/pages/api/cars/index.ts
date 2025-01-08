import { apiHandler } from '@/utils/apiHandler';
import { getAllCars, addCar } from '@/services/carService';

export default apiHandler(async (req, res) => {
  if (req.method === 'GET') {
    const cars = await getAllCars();
    return res.status(200).json(cars);
  }

  if (req.method === 'POST') {
    const car = req.body;
    const newCar = await addCar(car);
    return res.status(201).json(newCar);
  }

  res.status(405).json({ error: 'Method Not Allowed' });
});
