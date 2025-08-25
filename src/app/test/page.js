import { testSupabaseConnection } from '@/lib/supabase'

export default async function TestPage() {
  let isConnected = false
  let errorMessage = ''
  
  try {
    isConnected = await testSupabaseConnection()
  } catch (error) {
    errorMessage = error.message
    console.error('Test page error:', error)
  }
  
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Supabase Connection Test</h1>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 text-sm">
            <p><strong>SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
            <p><strong>SUPABASE_KEY exists:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Yes' : 'No'}</p>
            <p><strong>SUPABASE_KEY length:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0}</p>
          </div>
        </div>
        
        <div className={`rounded-lg p-6 ${isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p className={`text-lg ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
            {isConnected ? '✅ Connected to Supabase' : '❌ Failed to connect to Supabase'}
          </p>
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-100 rounded text-sm">
              <strong>Error:</strong> {errorMessage}
            </div>
          )}
        </div>
        
        {!isConnected && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold mb-3">Troubleshooting Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li><strong>Check if Supabase project is paused:</strong> Go to https://supabase.com/dashboard and look for "Paused" status</li>
              <li><strong>Resume project:</strong> If paused, click "Resume" to reactivate</li>
              <li><strong>Test direct access:</strong> Try visiting https://xfcgufatzoxleamkgbg.supabase.co in your browser</li>
              <li><strong>Check internet:</strong> Make sure you can access other websites</li>
              <li><strong>Firewall:</strong> Check if your network is blocking the connection</li>
            </ol>
            
            <div className="mt-4 p-3 bg-blue-100 rounded">
              <strong>Quick Test:</strong> Try opening <a href="https://xfcgufatzoxleamkgbg.supabase.co" target="_blank" className="text-blue-600 underline">https://xfcgufatzoxleamkgbg.supabase.co</a> in a new tab. If it shows a login page, the project is active. If it shows an error, the project is paused.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
