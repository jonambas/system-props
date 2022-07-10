import type * as CSS from 'csstype';

export type ExpandedConfig = {
  prop: string | string[];
  property: keyof CSS.StandardProperties;
  scale?: string;
};

export type SystemConfig =
  | ExpandedConfig
  | keyof CSS.StandardProperties;

type ParserProperties = {
  configs: ExpandedConfig[];
  propNames: string[];
};

type ParserFunction = (props: Record<string, any>) => CSS.Properties;

export type Parser = ParserFunction & ParserProperties;
