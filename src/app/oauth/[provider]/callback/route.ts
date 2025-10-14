import { NextRequest, NextResponse } from 'next/server';

import { serviceProviders } from '@/components/oauth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const providerInstance = serviceProviders[provider];

  if (!providerInstance) {
    return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Missing code in query parameters' },
      { status: 400 },
    );
  }

  try {
    const tokens = await providerInstance.getTokens(code);
    return NextResponse.json(tokens);
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to get tokens',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const providerInstance = serviceProviders[provider];

  if (!providerInstance) {
    return NextResponse.json({ error: 'Provider not found' }, { status: 404 });
  }

  const body = await request.json();
  const { refresh_token } = body;

  if (refresh_token) {
    try {
      const tokens = await providerInstance.refreshToken(refresh_token);
      return NextResponse.json(tokens);
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Failed to refresh token',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { error: 'Missing refresh token in request body' },
    { status: 400 },
  );
}
