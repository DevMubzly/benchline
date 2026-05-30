import { NextResponse } from 'next/server'

export async function GET() {
  const hasOAuth = !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  return NextResponse.json({ configured: hasOAuth })
}
