import fs from 'fs/promises';
import path from 'path';
import mime from 'mime-types';

export default async function findTemplate(product, type) {
  let filePath = null;

  switch (type) {
    case 'cert':
      filePath = `./templates/${product}/${type}.jpg`;
      break;
    case 'audio':
      filePath = `./templates/${product}/${type}.ogg`;
      break;
    case 'image':
      filePath = `./templates/${product}/${type}.jpg`;
      break;
    case 'pic':
      filePath = `./templates/${product}/${type}.webp`;
      break;
    default:
      throw new Error(`Unknown type "${type}"`);
  };

  const absolutePath = path.resolve(filePath);

  try {
    await fs.access(absolutePath);

    const fileContent = await fs.readFile(absolutePath);
    const mimetype = mime.lookup(absolutePath) || 'application/octet-stream';
    const filename = path.basename(absolutePath);

    return {
      filename,
      mimetype,
      content: fileContent,
    };
  } catch (error) {
    throw new Error(`Failed to access or read file at ${absolutePath}: ${error.message}`);
  }
};
