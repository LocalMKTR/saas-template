"use server"

import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

export const createSupabaseClient = async () => {
  const { getToken } = await auth()
  const supabaseAccessToken = await getToken({ template: 'supabase' })

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseAccessToken}`,
        },
      },
    }
  )
}

export async function logAllUserCompaniesRecords() {
  console.log('=== FETCHING ALL USERCOMPANIES RECORDS ===');
  
  const supabase = await createSupabaseClient();
  
  const { data, error } = await supabase
    .from('usercompanies')
    .select('*');

  console.log('Query result:', { data, error });
  
  if (error) {
    console.error('Error:', error);
    return { error: error.message };
  }

  console.log('Total records:', data?.length || 0);
  
  if (data && data.length > 0) {
    data.forEach((record, index) => {
      console.log(`Record ${index + 1}:`, record);
    });
  } else {
    console.log('No records found in usercompanies table');
  }

  return { data, count: data?.length || 0 };
}

export async function logAllCompaniesRecords() {
  console.log('=== FETCHING ALL COMPANIES RECORDS ===');
  
  const supabase = await createSupabaseClient();
  
  const { data, error } = await supabase
    .from('companies')
    .select('*');

  console.log('Query result:', { data, error });
  
  if (error) {
    console.error('Error:', error);
    return { error: error.message };
  }

  console.log('Total records:', data?.length || 0);
  
  if (data && data.length > 0) {
    data.forEach((record, index) => {
      console.log(`Record ${index + 1}:`, record);
    });
  } else {
    console.log('No records found in companies table');
  }

  return { data, count: data?.length || 0 };
}

export async function addUserToExistingCompany(salesId: string, code: string, team?: string, role?: string) {
  console.log('Starting addUserToExistingCompany...');
  console.log('Input parameters:', { salesId, code, team, role });
  
  // Get the current user
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('User not authenticated');
  }
  
  console.log('Current user ID:', userId);
  
  // Create authenticated Supabase client
  const supabase = await createSupabaseClient();
  
  // Find matching record
  const { data: matchingRecords, error: findError } = await supabase
    .from('usercompanies')
    .select('*')
    .eq('sales_id', salesId)
    .eq('code', code)
    .is('user_id', null);
  
  if (findError) {
    console.error('Find error:', findError);
    throw new Error(`Failed to find record: ${findError.message}`);
  }
  
  if (!matchingRecords || matchingRecords.length === 0) {
    throw new Error('Invalid Sales ID and Code combination');
  }
  
  const matchingRecord = matchingRecords[0];
  console.log('Matching record found:', matchingRecord);
  
  // Update the record with the user's ID
  const { data: updatedRecord, error: updateError } = await supabase
    .from('usercompanies')
    .update({
      user_id: userId,
      team: team || 'Default Team',
      role: role || 'Team Member',
    })
    .eq('id', matchingRecord.id)
    .select();
  
  console.log('Update result:', { data: updatedRecord, error: updateError });
  
  if (updateError) {
    console.error('Update error details:', updateError);
    throw new Error(`Failed to update record: ${updateError.message}`);
  }

  // Verify the update by fetching the record again
  const { data: verifyRecord, error: verifyError } = await supabase
    .from('usercompanies')
    .select('*')
    .eq('id', matchingRecord.id)
    .single();

  console.log('Verification fetch:', { data: verifyRecord, error: verifyError });

  if (verifyRecord && verifyRecord.user_id === userId) {
    console.log('Update confirmed - user_id successfully set to:', verifyRecord.user_id);
    
    return {
      success: true,
      message: 'Successfully joined company',
      record: verifyRecord
    };
  } else {
    console.log('Update may have failed - user_id not set correctly');
    throw new Error('Failed to update record - verification failed');
  }
}