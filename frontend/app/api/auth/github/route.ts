import { NextResponse } from 'next/server'

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'GitHub OAuth not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env' },
      { status: 500 }
    )
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:4000'}/api/auth/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'read:user',
  })

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`)
}
