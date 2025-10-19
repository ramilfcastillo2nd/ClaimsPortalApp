import { NextRequest, NextResponse } from 'next/server';
import { ApiClient } from '@/lib/auth/api';

export async function GET() {
    // Proxy to 7166 backend via ApiClient
    const upstream = await ApiClient.get('/claims');
    console.log('upstream', upstream);
    //     Accept: 'application/json',
    //   },
    //   params,
    // }
    return NextResponse.json(upstream.data);
}
