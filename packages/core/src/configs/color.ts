import { system } from '../system';

const scale = 'colors';

export const colors = system(
  {
    prop: ['color', 'textColor'],
    property: 'color',
    scale
  },
  {
    prop: ['bg', 'backgroundColor'],
    property: 'backgroundColor',
    scale
  },
  'opacity'
);
