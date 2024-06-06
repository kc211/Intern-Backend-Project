// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// interface DecodedToken {
//   email: string;
// }

// function authenticateToken(req: Request, res: Response, next: NextFunction) : Response | void {
//   // Extract the token from the Authorization header
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   // Verify and decode the token
//   const secretKey = process.env.ACCESS_TOKEN;
//   if (!secretKey) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }

//   jwt.verify(token, secretKey, (err, decoded): Response | void => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }

//     // Type assertion to ensure the decoded token has the expected shape
//     const decodedToken = decoded as DecodedToken;

//     // Add the decoded user information to the request object
//     // req.r = decodedToken;

//     // Proceed to the next middleware or route handler
//     console.log("in middleware before next" + req)
//     next();
//     console.log("in middleware after next" + req)
//   });
// }

// export default authenticateToken;


// middleware/auth.js
import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const accessToken: string = process.env.ACCESS_TOKEN ?? "";

interface AuthenticatedRequest extends Request {
  userId?: string; // Define userId property
}

const verifyToken = (req: Request,res: Response, next: NextFunction) : Response | void  => {
  const token: string | undefined = req.headers['authorization'];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token.split(' ')[1], accessToken, (err, decoded): Response| void  => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
    if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
      return res.status(500).json({ error: 'Invalid token format' });
    }
    // req.userId = (decoded as { id: string }).id; // Assuming id is a string
    (req as AuthenticatedRequest).userId = (decoded as { id: string }).id; // Assuming id is a string
    next();
  });
};

export default verifyToken;



