// import type * as CSS from 'csstype';
import { system } from '../system';

export const padding = system(
  {
    prop: ['padding', 'p'],
    property: 'padding',
    scale: 'space'
  },
  {
    prop: ['paddingX', 'px'],
    property: ['paddingLeft', 'paddingRight'],
    scale: 'space'
  },
  {
    prop: ['paddingY', 'py'],
    property: ['paddingTop', 'paddingBottom'],
    scale: 'space'
  },
  {
    prop: ['paddingLeft', 'pl'],
    property: 'paddingLeft',
    scale: 'space'
  },
  {
    prop: ['paddingRight', 'pr'],
    property: 'paddingRight',
    scale: 'space'
  },
  {
    prop: ['paddingTop', 'pt'],
    property: 'paddingTop',
    scale: 'space'
  },
  {
    prop: ['paddingBottom', 'pb'],
    property: 'paddingBottom',
    scale: 'space'
  }
);
