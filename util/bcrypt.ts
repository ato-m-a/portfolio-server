import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export const hash = async (plainText: string): Promise<string> => {
  const saltOrRounds = parseInt(process.env.SALT);
  return await bcrypt.hash(plainText, saltOrRounds);
};

export const compare = async (plainText: string, hashedText: string): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashedText);
};