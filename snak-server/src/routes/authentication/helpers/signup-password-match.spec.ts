import { signupPasswordMatch } from './signup-password-match';

describe('signupPasswordMatch', () => {
  it('should exist', () => {
    expect(signupPasswordMatch).toBeTruthy();
  });

  it('should return true if the passwords match', () => {
    const password = 'testPassword';
    const confirmPassword = 'testPassword';
    const result = signupPasswordMatch(password, confirmPassword);
    expect(result).toBeTruthy();
  });

  it('should return false if the passwords do not match', () => {
    const password = 'testPassword';
    const confirmPassword = 'wrongPassword';
    const result = signupPasswordMatch(password, confirmPassword);
    expect(result).toBeFalsy();
  });
});
