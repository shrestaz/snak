import { Db } from 'mongodb';
import { dataCollection } from '../../../enum/data-collection';
import { UserDB } from '../../../interfaces/user';

export async function getExistingUser(username: string, db: Db) {
  const userInDb = await db
    .collection<UserDB>(dataCollection.Users)
    .findOne({ username });

  return userInDb;
}
