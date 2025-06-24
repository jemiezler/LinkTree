import path from 'path';
import { promises as fs } from 'fs';

import { NextResponse } from 'next/server';

// GET /api/users?username=jemiezler
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  try {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileContents);

    if (username) {
      // If username query param is provided, find user
      const foundUser = users.find(
        (u: { username: string }) => u.username === username,
      );

      if (foundUser) {
        return NextResponse.json(foundUser);
      } else {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    // If no username provided, return all users
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
