// apps/dashboard/src/app/api/config/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const rootPath = path.join(process.cwd(), '../..'); // Assuming we're in apps/dashboard
const jsonPath = path.join(rootPath, 'clawesome.json');
const distDir = path.join(rootPath, 'dist');
const distPath = path.join(distDir, 'clawesome.json');

export async function GET() {
  try {
    const data = await fs.readFile(jsonPath, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading clawesome.json:', error);
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { config, action } = await request.json();

    if (action === 'save') {
      await fs.writeFile(jsonPath, JSON.stringify(config, null, 4), 'utf8');
      return NextResponse.json({ message: 'Configuration saved successfully' });
    } else if (action === 'publish') {
      // Create dist directory if it doesn't exist
      try {
        await fs.access(distDir);
      } catch {
        await fs.mkdir(distDir, { recursive: true });
      }

      await fs.writeFile(distPath, JSON.stringify(config, null, 4), 'utf8');
      return NextResponse.json({ message: 'Configuration published successfully to dist/' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error updating config:', error);
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
