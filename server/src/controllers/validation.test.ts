import { signUpSchema, urlSchema } from './validation';
test('Rejects invalid signUp data', () => {
  const mockData = {
    email: 'paolotiu.com',
    password: 'YOOOOOOO',
    callbackUrl: 'jdas',
  };

  // Email
  let res = signUpSchema.validate(mockData);
  expect(res.error?.message).toBe('"email" must be a valid email');

  // Password
  mockData.email = 'paolotiu@gmail.com';
  mockData.password = 'short';
  res = signUpSchema.validate(mockData);
  expect(res.error?.message).toBe('"password" length must be at least 6 characters long');
});

test('Rejects invalid url', () => {
  const url = 'someotherurl.com';
  const res = urlSchema.validate(url);
  expect(res.error).toBeTruthy();
});

test('Accepts good data', () => {
  const goodData = {
    email: 'goodemail@email.com',
    password: 'GoodPassword123',
    callbackUrl: 'somguerl.com/www',
  };

  const validUrl = 'https://shopee.ph/MiniMice-Mouse-Trap-(2-pcs.-pack)-i.38279392.573336764';

  expect(signUpSchema.validate(goodData).errors).toBeFalsy();
  expect(urlSchema.validate(validUrl).errors).toBeFalsy();
});
