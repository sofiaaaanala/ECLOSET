import ImageKit from 'imagekit';
import { NextResponse } from 'next/server';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ninguna imagen' }, { status: 400 });
    }

    // Convertir el archivo a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir a ImageKit
    const response = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: '/ecloset/prendas',
      useUniqueFileName: true,
    });

    return NextResponse.json({
      url: response.url,
      fileId: response.fileId,
    });

  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json({ error: 'Error al subir la imagen' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { fileId } = await request.json();