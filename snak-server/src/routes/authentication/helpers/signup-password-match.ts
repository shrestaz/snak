export function signupPasswordMatch(password: string, confirmPassword: string) {
  if (password === confirmPassword) {
    return true;
  }
  return false;
}
