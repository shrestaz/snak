import { Db } from 'mongodb';
import { dataCollection } from '../../../enum/data-collection';
import { UserDB } from '../../../interfaces/user';

/**
 * Helper function to get existing user from the database based on their username
 *
 * @export
 * @param {string} username
 * @param {Db} db
 * @return {*}
 */
export async function getExistingUser(username: string, db: Db) {
  const userInDb = await db
    .collection<UserDB>(dataCollection.Users)
    .findOne({ username });

  return userInDb;
}
