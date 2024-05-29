const { test, expect } = require('@playwright/test');
const { testUser } = require('../../data/users');
const { loggedInUserApiContext } = require('../../utilities/apiUtilities');
const { postRequest, getRequest, deleteRequest } = require('../../utilities/requestsHelpers');

test.beforeAll(async ({ playwright, request }) => {
  await loggedInUserApiContext(playwright, request, testUser);
});

test("Should register a new account.", async ({ request }) => {
  const newUser = {
    username: "FlorinBocse",
    password: "pass1234"
  };
  const registerResponse = await postRequest(request, "/users", newUser);
  expect(registerResponse.status()).toBe(201);
});

test("Should get list of users.", async ({ request }) => {
  const getUsersResponse = await getRequest(request, "/users");
  expect(getUsersResponse.ok()).toBeTruthy();
  const usersList = await getUsersResponse.json();
  expect(usersList).toBeDefined();
});

test("Should get user profile by username.", async ({ request }) => {
  const username = "Tavares_Barrows"; 
  const getUserProfileResponse = await getRequest(request, `/users/profile/${username}`);
  expect(getUserProfileResponse.ok()).toBeTruthy();
  const responseBody = await getUserProfileResponse.json();
  expect(typeof responseBody).toBe("object");
});

test("Should get list of bank accounts.", async ({ request }) => {
  const response = await getRequest(request, "/bankAccounts");
  expect(response.status()).toBe(200);
  const bankAccounts = await response.json();
  expect(bankAccounts.results).toBeDefined();
  expect(bankAccounts.results.length).toBeGreaterThan(0);
});

test("Should delete a bank account.", async ({ request }) => {
  const bankAccountId = "WgiYCFrxjGIo"; 
  const response = await deleteRequest(request, `/bankAccounts/${bankAccountId}`);
  expect(response.status()).toBe(200);
  const responseData = await response.json();
  expect(responseData.success).toBeFalsy();
});

test("Should get notifications list.", async ({ request }) => {
  const getNotificationsResponse = await getRequest(request, "/notifications");
  expect(getNotificationsResponse.ok()).toBeTruthy();
  const responseBody = await getNotificationsResponse.json();
  const notificationsList = responseBody.results;
  expect(Array.isArray(notificationsList)).toBeTruthy();
  expect(notificationsList.length).toBeGreaterThan(0);
});
