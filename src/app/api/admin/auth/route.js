import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { password } = await request.json()
    
    // Check if password matches environment variable
    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
