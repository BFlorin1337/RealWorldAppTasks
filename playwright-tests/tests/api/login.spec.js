const { test, expect } = require('@playwright/test');
const { testUser } = require('../../data/users');
const { postRequest } = require('../../utilities/requestsHelpers');

test("Should log in with existing account.", async ({ request }) => {
  const loginData = {
    username: testUser.username,
    password: testUser.password,
    type: "LOGIN",
  };
  const loginResponse = await postRequest(request, "/login", loginData);
  expect(loginResponse.ok()).toBeTruthy();
});   