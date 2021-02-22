import { Response, Request } from 'express';
import { initDb } from '../../database-connection';
import { User } from '../../interfaces/user';
import { getExistingUser } from './helpers/get-existing-user';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function login(req: Request, res: Response) {
  const db = await initDb();
  const { username, password } = req.body as User;
  if (!username || !password) {
    res
      .status(400)
      .send(`Bad request. Please try again with your credentials.`);
  }

  const existingUser = await getExistingUser(username, db);
  if (!existingUser) {
    return res.status(400).json({
      error: `User ${username} does not exist. Please create an account first.`,
    });
  }

  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    throw new Error(`JWT_KEY not found.`);
  }

  const passwordMatch = await compare(password, existingUser.password);

  if (!passwordMatch) {
    return res.status(400).json({
      error: `Incorrect password. Please try again.`,
    });
  }
  const accessToken = sign(JSON.stringify(existingUser), jwtKey);
  console.log(`${username} successfully logged in.`);

  return res.json({ accessToken, username });
}
