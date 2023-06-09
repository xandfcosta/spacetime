import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const redirectTo = request.cookies.get('redirectTo')?.value

  const registerRsponse = await api.post('/register', {
    code,
  })

  const { token } = registerRsponse.data

  const redirectUrl = redirectTo ?? new URL('/', request.url)

  const cookieExpireInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpireInSeconds};`,
    },
  })
}
