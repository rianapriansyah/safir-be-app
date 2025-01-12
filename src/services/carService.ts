import { supabase } from '@/lib/supabase';
import { Car } from '@/utils/interfaceModels';

export async function getAllCars() {
  const { data, error } = await supabase.from('car').select('*');
  if (error) throw new Error(error.message);
  return data;
}

export async function addCar(car: {
  vin: string;
  owned: boolean;
  name: string;
  dailyRate: number;
  threeHourRate: number;
  monthlyRate: number;
  ready: boolean;
}) {
  const { data, error } = await supabase.from('car').insert([
    {
      vin: car.vin,
      owned: car.owned,
      name: car.name,
      daily_rate: car.dailyRate,
      three_hour_rate: car.threeHourRate,
      monthly_rate: car.monthlyRate,
      ready: car.ready,
    },
  ]);
  if (error) throw new Error(error.message);
  return data;
}

export async function getCarById(vin: string) {
  const { data, error } = await supabase.from('car').select('*').eq('vin', vin).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateCar(vin: string, car: Partial<Omit<Car, 'vin'>>) {
  const { data, error } = await supabase.from('car').update(car).eq('vin', vin);
  if (error) throw new Error(error.message);
  return data;
}

// export async function deleteCar(id: number) {
//   const { error } = await supabase.from('cars').delete().eq('id', id);
//   if (error) throw new Error(error.message);
//   return { success: true };
// }
