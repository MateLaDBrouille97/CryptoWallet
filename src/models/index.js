// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Holding, User } = initSchema(schema);

export {
  Holding,
  User
};