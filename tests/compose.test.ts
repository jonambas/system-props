import { system } from '../src/index';
import { compose } from '../src/compose';

describe('compose', () => {
  it('composes configs', () => {
    const styleFn = compose(
      system({
        prop: 'color',
        property: 'color'
      }),
      system('display'),
      system('opacity', 'position')
    );

    expect(
      styleFn({
        display: 'none',
        opacity: '0',
        color: 'red',
        position: 'relative'
      })
    ).toStrictEqual({
      display: 'none',
      opacity: '0',
      color: 'red',
      position: 'relative'
    });
  });

  it('composes propNames', () => {
    const styleFn = compose(
      system({
        prop: 'color',
        property: 'color'
      }),
      system('display'),
      system('opacity', 'position')
    );

    expect(styleFn.propNames).toStrictEqual([
      'color',
      'display',
      'opacity',
      'position'
    ]);
  });
});
