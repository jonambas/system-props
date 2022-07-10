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
      property: 'color',
      scale: 'colors'
    });

    expect(typeof styleFn).toBe('function');
  });

  it('creates style functions from shorthand', () => {
    const styleFn = system('display', 'opacity');
    expect(
      styleFn({ theme, display: 'block', opacity: '0' })
    ).toEqual({
      opacity: '0',
      display: 'block'
    });
  });

  it('outputs a theme value', () => {
    const styleFn = system({
      prop: 'color',
      property: 'color',
      scale: 'colors'
    });

    const styles = styleFn({ theme, color: 'blue' });
    expect(styles).toStrictEqual({
      color: '#00f'
    });
  });

  it('outputs a non-theme value', () => {
    const styleFn = system({
      prop: 'color',
      property: 'color',
      scale: 'colors'
    });

    const styles = styleFn({ theme, color: '#fff' });
    expect(styles.color).toStrictEqual('#fff');
  });

  it('outputs a non-theme value with no scale', () => {
    const styleFn = system({
      prop: 'display',
      property: 'display'
    });

    const styles = styleFn({ theme, display: 'block' });
    expect(styles).toStrictEqual({ display: 'block' });
  });

  it('outputs a values with multiple aliased props', () => {
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
  });

  it('outputs a theme value from an object scale', () => {
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

  it('outputs negative theme and non-theme values', () => {
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

  it('outputs a value correctly if it matches a theme scale key', () => {
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

  describe('responsive objects', () => {
    it('outputs sorted responsive values from an object', () => {
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

    it('outputs grouped responsive values', () => {
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
