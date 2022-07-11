import { system } from '../system';

const scale = 'space';

export const margin = system(
  {
    prop: ['margin', 'm'],
    property: 'margin',
    scale
  },
  {
    prop: ['marginX', 'mx'],
    property: ['marginLeft', 'marginRight'],
    scale
  },
  {
    prop: ['marginY', 'my'],
    property: ['marginTop', 'marginBottom'],
    scale
  },
  {
    prop: ['marginLeft', 'ml'],
    property: 'marginLeft',
    scale
  },
  {
    prop: ['marginRight', 'mr'],
    property: 'marginRight',
    scale
  },
  {
    prop: ['marginTop', 'mt'],
    property: 'marginTop',
    scale
  },
  {
    prop: ['marginBottom', 'mb'],
    property: 'marginBottom',
    scale
  }
);
