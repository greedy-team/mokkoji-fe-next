import { NextResponse } from 'next/server';

export default async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200 },
  );
}
