import { system } from '../system';

export const typography = system(
  {
    prop: 'fontFamily',
    property: 'fontFamily',
    scale: 'fonts'
  },
  {
    prop: 'fontSize',
    property: 'fontSize',
    scale: 'fontSizes'
  },
  {
    prop: 'fontWeight',
    property: 'fontWeight',
    scale: 'fontWeights'
  },
  {
    prop: 'lineHeight',
    property: 'lineHeight',
    scale: 'lineHeights'
  },
  {
    prop: 'letterSpacing',
    property: 'letterSpacing',
    scale: 'letterSpacings'
  },
  'textAlign',
  'textDecoration',
  'textTransform',
  'fontStyle',
  'fontVariant',
  'wordBreak'
);
