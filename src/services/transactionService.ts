import { supabase } from '@/lib/supabase';
import { RawTransactionData, Transaction } from '@/utils/interfaceModels';

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
	rentType:string;
	in:Date;
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
			rent_type:transaction.rentType,
			in:transaction.in,
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

export async function getAllTransactionsByVin(vin: string) {
	const { data, error } = await supabase.from('transaction').select('*').eq('vin', vin);
	if (error) throw new Error(error.message);
	return data;
}

export async function updateTransaction(id: number, car: Partial<Omit<Transaction, 'id'>>) {
	const { data, error } = await supabase.from('transaction').update(car).eq('id', id);
	if (error) throw new Error(error.message);
	return data;
}

export async function getLatestUnfinishedTransactionByVin(vin: string) {
  const { data, error } = await supabase
    .from('transaction')
    .select('*')
    .eq('vin', vin)
    .is('in', null) // Assuming 'in' is null for unfinished transactions
    .order('out', { ascending: false })
    .limit(1)
    .single();

  if (error) throw new Error(error.message);
  
	// Map the result to the Transaction interface
  if (data) {
    return mapToTransaction(data);
  }
}

// export async function deleteCar(id: number) {
//   const { error } = await supabase.from('cars').delete().eq('id', id);
//   if (error) throw new Error(error.message);
//   return { success: true };
// }

function mapToTransaction(rawData: RawTransactionData): Transaction {
  return {
    id: rawData.id,
    vin: rawData.vin,
    name: rawData.car_name || '', // Fallback to an empty string if the field is missing
    renterName: rawData.renter_name || '',
    renterPhone: rawData.renter_phone || '',
    out: new Date(rawData.out), // Convert to Date object
    in: rawData.in ? new Date(rawData.in) : new Date(), // Handle null for unfinished transactions
    rentType: rawData.rent_type || '',
    fuelOut: rawData.fuel_out || '',
    fuelIn: rawData.fuel_in || '',
    expectedPayment: rawData.expected_payment || 0,
    actualPayment: rawData.actual_payment || 0,
    desc: rawData.desc || '',
  };
}
