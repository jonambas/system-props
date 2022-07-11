import type { Parser } from './types';
import { makeParser } from './system';

export const compose = (...parsers: Parser[]): Parser => {
  return makeParser(parsers.flatMap(({ configs }) => configs));
};
