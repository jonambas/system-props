// import type * as CSS from 'csstype';
import { system } from '../system';

export const background = system(
  'background',
  {
    prop: ['backgroundImage', 'bgImage'],
    property: 'backgroundImage'
  },
  {
    prop: ['backgroundSize', 'bgSize'],
    property: 'backgroundSize'
  },
  {
    prop: ['backgroundPosition', 'bgPosition'],
    property: 'backgroundPosition'
  },
  {
    prop: ['backgroundRepeat', 'bgRepeat'],
    property: 'backgroundRepeat'
  }
);
