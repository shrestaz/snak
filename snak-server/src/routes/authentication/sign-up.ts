import { hash } from 'bcrypt';
import { Request, Response } from 'express';
import { getDb } from '../../database-connection';
import { dataCollection } from '../../enum/data-collection';
import { UserSignUpInput } from '../../interfaces/user';
import { getExistingUser } from './helpers/get-existing-user';
import { signupPasswordMatch } from './helpers/signup-password-match';

export async function signUp(req: Request, res: Response) {
  const db = await getDb();
  try {
    // extract username and password from request body
    const { username, password, confirmPassword } = req.body as UserSignUpInput;

    if (!username || !password || !confirmPassword) {
      res.status(400).send(`Bad request. Please provide all the fields.`);
    }

    // Sanity checks
    const userExists = await getExistingUser(username, db);
    if (userExists) {
      return res.status(400).json({
        error: `User ${username} already exists. Please try again with a different name.`,
      });
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
      return res.status(200).json({ success: true, username });
    }
  } catch (error) {
    res
      .status(500)
      .send(`signUp failed unexpectedly with error ${error.message}`);
    throw error;
  }
}
