import { system } from '../system';

const scale = 'space';

export const padding = system(
  {
    prop: ['padding', 'p'],
    property: 'padding',
    scale
  },
  {
    prop: ['paddingX', 'px'],
    property: ['paddingLeft', 'paddingRight'],
    scale
  },
  {
    prop: ['paddingY', 'py'],
    property: ['paddingTop', 'paddingBottom'],
    scale
  },
  {
    prop: ['paddingLeft', 'pl'],
    property: 'paddingLeft',
    scale
  },
  {
    prop: ['paddingRight', 'pr'],
    property: 'paddingRight',
    scale
  },
  {
    prop: ['paddingTop', 'pt'],
    property: 'paddingTop',
    scale
  },
  {
    prop: ['paddingBottom', 'pb'],
    property: 'paddingBottom',
    scale
  }
);
