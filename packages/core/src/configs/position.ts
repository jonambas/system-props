import { system } from '../system';

const scale = 'space';

export const position = system(
  'position',
  {
    prop: 'top',
    property: 'top',
    scale
  },
  {
    prop: 'bottom',
    property: 'bottom',
    scale
  },
  {
    prop: 'left',
    property: 'left',
    scale
  },
  {
    prop: 'right',
    property: 'right',
    scale
  },
  {
    prop: ['z', 'zIndex'],
    property: 'zIndex',
    scale: 'zIndices'
  }
);
