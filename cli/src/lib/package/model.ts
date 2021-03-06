import {PackageSpec, RuleMeta} from './spec'
import {PackageConfig} from '../config';

export interface Meta {
  readonly packageName: string;

  readonly packagePath: string;

  readonly packageSpec: PackageSpec;

  readonly packageConfig: PackageConfig;

}

export interface Resource {
  name: string;
  type: string;
  properties: { [key: string]: any };
  meta?: { [key: string]: any };
}

export interface Snapshot {
  timestamp: Date;
  resources: {
    [key: string]: Resource[];
  };
}

export interface Problem {
  message: string;
  data?: {
    [key: string]: any;
  };
  fix?: {
    action?: string;
    advice?: string;
  };
}

export interface CheckingResult {
  timestamp: Date;
  result: {
    [key: string]: {
      meta: RuleMeta;
      problems: Problem[];
    };
  };
}

export interface Fix {
  rule: string;
  problem: Problem;
  isFixed?: boolean;
  error?: string;
}

export interface FixingResult {
  timestamp: Date;
  fixes: Fix[];
}
