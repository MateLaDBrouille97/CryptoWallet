import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type HoldingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Holding {
  readonly id: string;
  readonly qty?: string | null;
  readonly name?: string | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Holding, HoldingMetaData>);
  static copyOf(source: Holding, mutator: (draft: MutableModel<Holding, HoldingMetaData>) => MutableModel<Holding, HoldingMetaData> | void): Holding;
}

export declare class User {
  readonly id: string;
  readonly name?: string | null;
  readonly sub?: string | null;
  readonly username?: string | null;
  readonly Holdings?: (Holding | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}