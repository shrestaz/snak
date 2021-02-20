import { Request, Response } from 'express';
import { hash } from 'bcrypt';
import { initDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { getExistingUser } from './helpers/get-existing-user';
import { signupPasswordMatch } from './helpers/signup-password-match';
import { UserSignUpInput } from '../../interfaces/user';

export async function signUp(req: Request, res: Response) {
  const db = await initDb();
  try {
    // extract username and password from request body
    const { username, password, confirmPassword } = req.body as UserSignUpInput;

    // Sanity checks
    const userExists = await getExistingUser(username, db);
    if (userExists) {
      return res
        .status(400)
        .send(
          `User ${username} already exists. Please try again with a different username.`
        );
    }
    const doesPasswordMatch = signupPasswordMatch(password, confirmPassword);
    if (!doesPasswordMatch) {
      return res
        .status(400)
        .send('Provided passwords do not match. Please try again.');
    }

    // Use bcrypt to hash the password with salt
    const hashedPassword = await hash(password, 10);

    // Save the user to the database
    const result = await db
      .collection(dataCollection.Users)
      .insertOne({ username, password: hashedPassword });
    if (result.result.ok) {
      console.log(
        `User successfull created with username ${username} and id ${result.insertedId}`
      );
      return res
        .status(200)
        .send(`Successfully created user with username ${username}`);
    }
  } catch (error) {
    res
      .status(500)
      .send(`signUp failed unexpectedly with error ${error.message}`);
    throw error;
  }
}
