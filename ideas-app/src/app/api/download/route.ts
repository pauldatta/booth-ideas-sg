import { createDownloadZip } from '@/app/actions';
import { NextRequest, NextResponse } from 'next/server';
import { GenerationResult } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const data: GenerationResult = await request.json();
    const { zipDataUri } = await createDownloadZip(data);
    
    const base64Data = zipDataUri.split(';base64,').pop();
    if (!base64Data) {
        return new NextResponse('Failed to extract zip data', { status: 500 });
    }
    const buffer = Buffer.from(base64Data, 'base64');

    const headers = new Headers();
    headers.set('Content-Type', 'application/zip');
    headers.set('Content-Disposition', 'attachment; filename="prototype-project.zip"');

    return new NextResponse(buffer, { headers });
  } catch (error) {
    console.error('Failed to create or serve zip file:', error);
    if (error instanceof Error && error.message.includes("Invalid data")) {
        return new NextResponse('Invalid data provided for zip creation.', { status: 400 });
    }
    return new NextResponse('Failed to generate download file.', { status: 500 });
  }
}
