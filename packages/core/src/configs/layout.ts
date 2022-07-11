import { system } from '../system';

const scale = 'sizes';

export const layout = system(
  {
    prop: ['width', 'w'],
    property: 'width',
    scale
  },
  {
    prop: ['height', 'h'],
    property: 'height',
    scale
  },
  {
    prop: ['minWidth', 'minW'],
    property: 'minWidth',
    scale
  },
  {
    prop: ['minHeight', 'minH'],
    property: 'minHeight',
    scale
  },
  {
    prop: ['maxWidth', 'maxW'],
    property: 'maxWidth',
    scale
  },
  {
    prop: ['maxHeight', 'maxH'],
    property: 'maxHeight',
    scale
  },
  {
    prop: 'size',
    property: ['width', 'height'],
    scale
  },
  'overflow',
  'overflowX',
  'overflowY',
  'display',
  'verticalAlign',
  'visibility'
);
