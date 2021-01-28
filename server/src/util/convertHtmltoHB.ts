import { PathLike } from 'fs';
import fs from 'fs/promises';
import handlebars from 'handlebars';
import p from 'path';
const convert = async (path: string, replacements: { [key: string]: string }) => {
  const html = await fs.readFile(p.join(process.cwd(), path), { encoding: 'utf-8' });
  const template = handlebars.compile(html);
  const converted = template(replacements);
  return converted;
};

export default convert;
