/**
 * Simple helper ffunction to match the values of
 * password and confirmPassword on user signup.
 *
 * @export
 * @param {string} password
 * @param {string} confirmPassword
 * @return {*}
 */
export function signupPasswordMatch(password: string, confirmPassword: string) {
  if (password === confirmPassword) {
    return true;
  }
  return false;
}
