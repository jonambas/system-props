import { merge, mediaQuery } from '../src/utils';

describe('merge', () => {
  it('merges flat objects', () => {
    const result = merge(
      {
        a: 'b'
      },
      {
        c: 'd'
      }
    );

    expect(result).toStrictEqual({ a: 'b', c: 'd' });
  });

  it('merges objects with objects', () => {
    const result = merge(
      {
        a: {
          b: 'c'
        }
      },
      {
        a: {
          c: 'd'
        }
      }
    );

    expect(result).toStrictEqual({ a: { b: 'c', c: 'd' } });
  });
});

describe('mediaQuery', () => {
  it('makes a media query', () => {
    expect(mediaQuery('100px')).toEqual(
      '@media screen and (min-width: 100px)'
    );
  });
});
