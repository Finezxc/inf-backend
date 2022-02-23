import { join } from 'path';

export function joinUrl(...parts: string[]): string {
  return new URL(join(...[...parts.slice(1)]), parts[0]).href;
}
