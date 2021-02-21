import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtTokenPayload } from '../interfaces/jwtTokenPaylod';

export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenInHeader = req.headers.authorization;
  if (!tokenInHeader) {
    return res.status(401).send('Authorization token missing.');
  }

  // Fetch the private key to verify the token
  const jwtKey = process.env.JWT_KEY;
  if (!jwtKey) {
    return res.status(500).send(`JWT_KEY not found.`);
  }
  try {
    const authToken = tokenInHeader.split(' ')[1];
    const decodedToken = verify(authToken, jwtKey) as JwtTokenPayload;
    console.log(decodedToken);
    const username = decodedToken.username;
    if (!username) {
      return res.send(401).send(`Invalid request.`);
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .send(`Authentication middleware failed with error "${error.message}"`);
  }
}
