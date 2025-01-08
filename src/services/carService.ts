import { supabase } from '@/lib/supabase';

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

export async function getCarById(id: number) {
  const { data, error } = await supabase.from('car').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

// export async function updateCar(id: number, car: Partial<Omit<typeof car, 'id'>>) {
//   const { data, error } = await supabase.from('cars').update(car).eq('id', id);
//   if (error) throw new Error(error.message);
//   return data;
// }

// export async function deleteCar(id: number) {
//   const { error } = await supabase.from('cars').delete().eq('id', id);
//   if (error) throw new Error(error.message);
//   return { success: true };
// }
