import type * as CSS from 'csstype';
import {
  getConfig,
  getPropNames,
  merge,
  mediaQuery,
  sort
} from './utils';
import type { ExpandedConfig, Parser, SystemConfig } from './types';

/**
 * Gets a value from a provided theme scale
 * Also handles negative values
 */
const get = (value: string, scale?: Record<string, any>) => {
  if (!scale) {
    return value;
  }

  const negative = Boolean(value.match(/^-/));
  const parts = negative
    ? value.replace(/^-/, '').split('.')
    : value.split('.');

  const result = parts.reduce((o, key) => {
    if (!o || !o[key]) {
      return undefined;
    }
    return o[key];
  }, scale);

  return negative && typeof result === 'string'
    ? `-${result}`
    : // prevents objects from being returned
    typeof result === 'string'
    ? result
    : value;
};

const parseResponsiveObject = (
  property: keyof CSS.StandardProperties,
  value: Record<string, any>,
  breakpoints?: Record<string, any>,
  scale?: Record<string, any>
) => {
  if (!breakpoints) {
    return {};
  }

  let styles = {};
  for (const key in value) {
    // Handle default non-mq value
    if (key === '_') {
      styles = {
        ...styles,
        [property]: get(value[key], scale)
      };
      continue;
    }

    // Handle each additional mq
    if (breakpoints[key]) {
      styles = {
        ...styles,
        [mediaQuery(breakpoints[key])]: {
          [property]: get(value[key], scale)
        }
      };
      continue;
    }
  }
  return styles;
};

export const makeParser = (configs: ExpandedConfig[]): Parser => {
  const parser: Parser = (props) => {
    let styles = {};
    let shouldSort = false;
    const breakpoints = props.theme?.breakpoints;

    for (const prop in props) {
      const config = getConfig(prop, configs);

      const scale =
        config?.scale && props.theme && props.theme[config.scale]
          ? props.theme[config.scale]
          : undefined;

      if (!config) {
        continue;
      }

      if (typeof props[prop] === 'object') {
        shouldSort = true;
        styles = merge(
          styles,
          parseResponsiveObject(
            config.property,
            props[prop],
            breakpoints,
            scale
          )
        );

        continue;
      }

      styles = {
        ...styles,
        [config.property]: get(props[prop], scale)
      };
    }

    return shouldSort ? sort(styles) : styles;
  };

  parser.configs = configs;
  parser.propNames = getPropNames(configs);
  return parser;
};

export const system = (...configs: SystemConfig[]) => {
  // Expands shorthand configs from strings to config objects
  const expanded = configs.map((config) => {
    return typeof config === 'string'
      ? { prop: config, property: config }
      : config;
  });

  return makeParser(expanded);
};
