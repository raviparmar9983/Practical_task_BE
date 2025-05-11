import * as bcrypt from 'bcrypt';

export const hashGenerator = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

export const comparePassword = async (
  userPassword: string,
  hash: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPassword, hash, (err, isMatch) => {
      if (err) reject(err);
      resolve(isMatch);
    });
  });
};
