import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./auth.model";
import { ACCESS_TOKEN_EXPIRY_LIMIT, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRED_ERROR, REFRESH_TOKEN_EXPIRY_LIMIT, REFRESH_TOKEN_INVALID_ERROR, REFRESH_TOKEN_SECRET_KEY, USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constant';
import { pool } from '../config/postgres.config';


const generateAccessToken = (user: User) => {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (user: User) => {
  return jwt.sign({ id: user.id }, REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: '7d',
  });
};


export class AuthService {
  async registerUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );
    
    const user = result.rows[0];

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async loginUser(email: string, password: string) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user) throw new Error();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error(WRONG_PASSWORD_ERROR);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await pool.query("INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)", [user.id, refreshToken]);


    return { user, accessToken, refreshToken };
  };


  async refreshAccessToken(refreshToken: string) {
    const result = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);
    const storedToken = result.rows[0];

    if (!storedToken) throw new Error(REFRESH_TOKEN_INVALID_ERROR);

    const currentTime = new Date();
    if (new Date(storedToken.expires_at) < currentTime) {
      throw new Error(REFRESH_TOKEN_EXPIRED_ERROR);
    }

    await pool.query('DELETE FROM refresh_tokens WHERE token = $1', [refreshToken]);

    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [storedToken.user_id]);
    const user = userResult.rows[0];

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await pool.query('INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)', [
      user.id,
      newRefreshToken,
    ]);

    return { newAccessToken, newRefreshToken };
  }
  
  async logoutUser(refreshToken: string) {
    if (!refreshToken) return;

    await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [refreshToken]);
  }
}


