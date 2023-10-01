/**
 * Checks if an email is valid.
 * @param email - The email to be validated.
 * @returns A boolean indicating whether the email is valid or not.
 */
export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
