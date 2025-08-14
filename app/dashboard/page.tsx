import { createClient } from '@supabase/supabase-js'
import { auth } from '@clerk/nextjs/server'

const DashboardPage = async () => {
  const { userId } = await auth()
  
  if (!userId) {
    return <div>Not authenticated</div>
  }

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // Test query - adjust table name to match your schema
    const { data, error } = await supabase
      .from('your_table_name')
      .select('*')
      .limit(1)

    if (error) {
      throw error
    }

    return (
      <div className="p-4">
        <h1>Dashboard</h1>
        <p>User ID: {userId}</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  } catch (error) {
    console.error('Error:', error)
    return <div>Error connecting to Supabase</div>
  }
}

export default DashboardPage