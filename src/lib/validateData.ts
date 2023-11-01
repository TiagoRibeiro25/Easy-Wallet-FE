/**
 * Checks if an email is valid.
 * @param email - The email to be validated.
 * @returns A boolean indicating whether the email is valid or not.
 */
export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if a password is valid.
 * @param password - The password to be validated.
 * @returns True if the password is valid, false otherwise.
 */
export const isPasswordValid = (password: string) => {
  return password.length >= 4;
};
