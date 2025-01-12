import { supabase } from '@/lib/supabase';
import { Transaction } from '@/utils/interfaceModels';

export async function getAllTransactions() {
	const { data, error } = await supabase.from('transaction').select('*');
	if (error) throw new Error(error.message);
	return data;
}

export async function addTransaction(transaction: {
	vin:string;
	name:string;
	renterName:string;
	renterPhone:string
  out:Date;
	in:Date;
	rentType:string;
	fuelOut:string;
	fuelIn:string;
	expectedPayment:number;
	actualPayment:number;
	desc:string;
}) {
	const { data, error } = await supabase.from('transaction').insert([
		{
			vin:transaction.vin,
			car_name:transaction.name,
			renter_name:transaction.renterName,
			renter_phone:transaction.renterPhone,
			out:transaction.out,
			in:transaction.in,
			rent_type:transaction.rentType,
			fuel_out:transaction.fuelOut,
			fuel_in:transaction.fuelIn,
			expected_payment:transaction.expectedPayment,
			actual_payment:transaction.actualPayment,
			desc:transaction.desc,
		},
	]);
	if (error) throw new Error(error.message);
	return data;
}

export async function getTransactionById(id: number) {
	const { data, error } = await supabase.from('transaction').select('*').eq('id', id).single();
	if (error) throw new Error(error.message);
	return data;
}

export async function updateTransaction(id: number, car: Partial<Omit<Transaction, 'id'>>) {
	const { data, error } = await supabase.from('transaction').update(car).eq('id', id);
	if (error) throw new Error(error.message);
	return data;
}

// export async function deleteCar(id: number) {
//   const { error } = await supabase.from('cars').delete().eq('id', id);
//   if (error) throw new Error(error.message);
//   return { success: true };
// }
