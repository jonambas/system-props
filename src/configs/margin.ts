// import type * as CSS from 'csstype';
import { system } from '../system';

export const margin = system(
  {
    prop: ['margin', 'm'],
    property: 'margin',
    scale: 'space'
  },
  {
    prop: ['marginX', 'mx'],
    property: ['marginLeft', 'marginRight'],
    scale: 'space'
  },
  {
    prop: ['marginY', 'my'],
    property: ['marginTop', 'marginBottom'],
    scale: 'space'
  },
  {
    prop: ['marginLeft', 'ml'],
    property: 'marginLeft',
    scale: 'space'
  },
  {
    prop: ['marginRight', 'mr'],
    property: 'marginRight',
    scale: 'space'
  },
  {
    prop: ['marginTop', 'mt'],
    property: 'marginTop',
    scale: 'space'
  },
  {
    prop: ['marginBottom', 'mb'],
    property: 'marginBottom',
    scale: 'space'
  }
);
