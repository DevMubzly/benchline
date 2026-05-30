import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  const clientId = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (error || !code) {
    return new Response(
      oauthPage(`GitHub authorization failed: ${error || 'No code returned'}`),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  if (!clientId || !clientSecret) {
    return new Response(
      oauthPage('GitHub OAuth not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env'),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:4000'}/api/auth/callback`
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }),
    })

    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    if (!accessToken) {
      return new Response(
        oauthPage(`Failed to get access token: ${tokenData.error_description || tokenData.error}`),
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!userRes.ok) {
      return new Response(
        oauthPage('Failed to fetch GitHub user'),
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    const userData = await userRes.json()

    return new Response(
      successPage(userData, accessToken),
      { headers: { 'Content-Type': 'text/html' } }
    )
  } catch (err) {
    return new Response(
      oauthPage(`Authentication error: ${err instanceof Error ? err.message : 'Unknown error'}`),
      { headers: { 'Content-Type': 'text/html' } }
    )
  }
}

function oauthPage(message: string) {
  return `<!DOCTYPE html>
<html><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui;background:#fafafa">
<div style="max-width:400px;text-align:center;padding:2rem;border:1px solid #000">
<h1 style="font-size:1rem;font-weight:700">BENCHLINE</h1>
<p style="color:#666;font-size:0.875rem;margin-top:1rem">${message}</p>
<a href="/login" style="display:inline-block;margin-top:1.5rem;background:#000;color:#fff;padding:0.5rem 1.5rem;text-decoration:none;font-size:0.875rem">Try again</a>
</div></body></html>`
}

function successPage(user: { id: number; login: string; name: string | null; avatar_url: string; bio: string | null; html_url: string; public_repos: number; followers: number }, token: string) {
  return `<!DOCTYPE html>
<html><body><script>
const user = ${JSON.stringify({
    id: user.id,
    login: user.login,
    name: user.name,
    avatar_url: user.avatar_url,
    bio: user.bio,
    html_url: user.html_url,
    public_repos: user.public_repos,
    followers: user.followers,
  })};
localStorage.setItem('benchline_user', JSON.stringify(user));
localStorage.setItem('github_access_token', '${token}');
window.location.href = '/';
</script></body></html>`
}
