import { Duplex } from 'stream';

export const bufferToStream = (buffer: Buffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};
