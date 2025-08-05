import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const db = JSON.parse(data);
    return NextResponse.json(db.weeklyPlan);
  } catch (error) {
    console.error('Error reading db.json:', error);
    return NextResponse.json(
      { error: 'Failed to read data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const weeklyPlan = await request.json();
    
    // Read current db
    let db = { weeklyPlan: {} };
    try {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      db = JSON.parse(data);
    } catch (error) {
      console.log('Creating new db.json file');
    }
    
    // Update weekly plan
    db.weeklyPlan = weeklyPlan;
    
    // Write back to file
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to db.json:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}
