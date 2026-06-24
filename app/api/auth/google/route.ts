import { NextResponse } from 'next/server';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXTAUTH_URL}/api/auth/google/callback`
);

export async function GET() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['email', 'profile'],
  });

  return NextResponse.redirect(url);
}