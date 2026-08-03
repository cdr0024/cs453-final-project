import jwt from 'jsonwebtoken';
import { config } from '../config.js';

// The imports above are supplied so students can use jwt and config.jwtSecret.
export function authenticateToken(req, res, next) {
  // TODO(PART 3): Validate the Bearer JWT and set req.user before calling next().
  const authorization = req.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication Required'});

  }

  const token = authorization.substring('Bearer '.length);
  try {
    const user = jwt.verify(token, config.jwtSecret);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }

}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // TODO(PART 3): Authorize req.user.role against allowedRoles before calling next().
    if(!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'You do not have permission to perform this action'
      });
    }
    next();
  };
}

void jwt;
void config;
