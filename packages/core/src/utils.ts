import type { ExpandedConfig } from './types';

/**
 * Merged objects down to one level
 * Used for grouping media queries together
 */
export const merge = (
  a: Record<string, any>,
  b: Record<string, any>
): Record<string, any> => {
  let merged = { ...a, ...b };
  for (const key in a) {
    if (typeof a[key] === 'object' && typeof b[key] === 'object') {
      merged = {
        ...merged,
        [key]: { ...a[key], ...b[key] }
      };
    }
  }
  return merged;
};

export const mediaQuery = (bp: string): string => {
  return `@media screen and (min-width: ${bp})`;
};

/**
 * Sorts styles so media queries are in order
 */
export const sort = (
  styles: Record<string, any>
): Record<string, any> => {
  const sorted = {} as Record<string, any>;
  Object.keys(styles)
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base'
      })
    )
    .forEach((key) => {
      sorted[key] = styles[key];
    });
  return sorted;
};

export const getConfig = (
  prop: string,
  configs: ExpandedConfig[]
): ExpandedConfig | undefined => {
  const result = configs.find((c) => {
    if (typeof c.prop === 'string') {
      return c.prop === prop;
    }
    return c.prop.includes(prop);
  });
  return result;
};

export const getPropNames = (configs: ExpandedConfig[]): string[] => {
  return configs.flatMap((config) => {
    return typeof config.prop === 'string'
      ? [config.prop]
      : config.prop;
  });
};
