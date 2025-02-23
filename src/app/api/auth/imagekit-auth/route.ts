import ImageKit from "imagekit"
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const authenticator = imagekit.getAuthenticationParameters()
    return NextResponse.json(authenticator);
  } catch (error) {
    throw error;
  }
}