import { system } from '../src';

const theme = {
  colors: {
    blue: '#00f',
    red: '#f00',
    gray: {
      100: '#111',
      200: '#555'
    }
  },
  space: {
    100: '100px',
    200: '200px'
  },
  fontSizes: ['0.75rem', '1rem', '1.5rem'],
  breakpoints: {
    sm: '100em',
    md: '200em',
    lg: '300em'
  }
};

describe('system', () => {
  it('creates a style function', () => {
    const styleFn = system({
      prop: 'color',
      property: 'color'
    });

    expect(typeof styleFn).toBe('function');
    expect(styleFn.propNames).toEqual(['color']);
  });

  it('creates style functions from shorthand', () => {
    const styleFn = system('display', 'opacity');
    expect(typeof styleFn).toBe('function');
    expect(styleFn.propNames).toEqual(['display', 'opacity']);
  });

  it('parses strings', () => {
    const styleFn = system('display');
    expect(styleFn({ display: 'block' })).toEqual({
      display: 'block'
    });
  });

  it('parses numbers', () => {
    const styleFn = system('width');
    expect(styleFn({ width: 1 / 2 })).toEqual({
      width: '50%'
    });
  });

  it('shouldnt parse on booleans, nulls, or undefined', () => {
    const styleFn = system('width');
    expect(styleFn({ width: undefined })).toEqual({});
    expect(styleFn({ width: null })).toEqual({});
    expect(styleFn({ width: true })).toEqual({});
  });

  it('parses a theme value from an object scale', () => {
    const styleFn = system({
      prop: 'color',
      property: 'color',
      scale: 'colors'
    });

    expect(styleFn({ theme, color: 'blue' })).toStrictEqual({
      color: '#00f'
    });
  });

  it('parses a theme value from an array scale', () => {
    const styleFn = system({
      prop: 'fontSize',
      property: 'fontSize',
      scale: 'fontSizes'
    });

    expect(styleFn({ theme, fontSize: 1 })).toStrictEqual({
      fontSize: '1rem'
    });
  });

  it('parses a non-theme value with a scale', () => {
    const styleFn = system(
      {
        prop: 'color',
        property: 'color',
        scale: 'colors'
      },
      {
        prop: 'fontSize',
        property: 'fontSize',
        scale: 'fontSizes'
      }
    );

    expect(
      styleFn({ theme, color: '#fff', fontSize: '3rem' })
    ).toStrictEqual({
      color: '#fff',
      fontSize: '3rem'
    });
  });

  it('parses values with multiple aliased props', () => {
    const styleFn = system({
      prop: ['color', 'c', 'col'],
      property: 'color',
      scale: 'colors'
    });

    expect(styleFn({ theme, c: 'blue' })).toStrictEqual({
      color: '#00f'
    });
    expect(styleFn({ theme, col: 'red' })).toStrictEqual({
      color: '#f00'
    });
    expect(styleFn.propNames).toEqual(['color', 'c', 'col']);
  });

  it('parses theme value from an deep object scale', () => {
    const styleFn = system({
      prop: 'color',
      property: 'color',
      scale: 'colors'
    });

    const styles = styleFn({ theme, color: 'gray.100' });
    expect(styles).toStrictEqual({
      color: '#111'
    });
  });

  it('parses negative theme and non-theme values', () => {
    const styleFn = system(
      {
        prop: 'mb',
        property: 'marginBottom',
        scale: 'space'
      },
      {
        prop: 'mt',
        property: 'marginTop',
        scale: 'space'
      }
    );

    const styles = styleFn({
      theme,
      mb: '-2rem',
      mt: '-200'
    });

    expect(styles).toStrictEqual({
      marginBottom: '-2rem',
      marginTop: '-200px'
    });
  });

  it('parses a value correctly if it matches a theme scale key', () => {
    const styleFn = system({
      prop: 'color',
      property: 'color',
      scale: 'colors'
    });

    const styles = styleFn({
      theme,
      color: 'gray'
    });

    expect(styles).toStrictEqual({
      color: 'gray'
    });
  });

  it('parses multiple properties', () => {
    const styleFn = system({
      prop: 'size',
      property: ['width', 'height'],
      scale: 'space'
    });

    expect(
      styleFn({
        theme,
        size: '1rem'
      })
    ).toStrictEqual({
      width: '1rem',
      height: '1rem'
    });
  });

  it('parses multiple properties with an alias, negatives, and theme values', () => {
    const styleFn = system({
      prop: ['size', 's'],
      property: ['width', 'height'],
      scale: 'space'
    });

    expect(
      styleFn({
        theme,
        s: '-100'
      })
    ).toStrictEqual({
      width: '-100px',
      height: '-100px'
    });
  });

  describe('responsive objects', () => {
    it('sorts responsive values from an object', () => {
      const styleFn = system({
        prop: 'color',
        property: 'color',
        scale: 'colors'
      });

      const styles = styleFn({
        theme,
        color: { lg: '#fff', sm: 'blue', md: '#fff', _: 'red' }
      });

      expect(Object.keys(styles)).toStrictEqual([
        '@media screen and (min-width: 100em)',
        '@media screen and (min-width: 200em)',
        '@media screen and (min-width: 300em)',
        'color'
      ]);
    });

    it('groups responsive values', () => {
      const styleFn = system(
        {
          prop: 'mt',
          property: 'marginTop',
          scale: 'space'
        },
        {
          prop: 'color',
          property: 'color',
          scale: 'colors'
        }
      );

      const styles = styleFn({
        theme,
        color: { _: 'red', sm: 'gray.100', md: 'blue' },
        mt: { _: '1px', sm: '-2px', md: '-100' }
      });

      expect(styles).toStrictEqual({
        '@media screen and (min-width: 100em)': {
          marginTop: '-2px',
          color: '#111'
        },
        '@media screen and (min-width: 200em)': {
          marginTop: '-100px',
          color: '#00f'
        },
        marginTop: '1px',
        color: '#f00'
      });
    });
  });
});
