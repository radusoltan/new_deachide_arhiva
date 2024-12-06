import { createReadStream } from 'fs';
import { resolve } from 'path';

export async function GET(request, props) {
  const params = await props.params;
  const filePath = resolve(process.env.IMAGES_PATH, ...params.imagePath);

  try {

    const stream = createReadStream(filePath);
    return new Response(stream, {
      headers: { 'Content-Type': 'image/jpeg' },
    });
  } catch (error) {
    return new Response('Image not found', { status: 404 });
  }
}