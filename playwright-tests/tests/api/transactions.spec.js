const { test, expect } = require('@playwright/test');
const { testUser } = require('../../data/users');
const { loggedInUserApiContext } = require('../../utilities/apiUtilities');
const { createTransaction } = require('../../utilities/requestsHelpers');

test.beforeAll(async ({ playwright, request }) => {
  await loggedInUserApiContext(playwright, request, testUser);
});

test("Should submit payment request transaction.", async ({ request }) => {
  const transactionData = {
    amount: 10000,
    description: "Example of a payment request transaction description.",
    privacyLevel: "contacts",
    receiverId: "qywYp6hS0U",
    senderId: "t45AiwidW",
    transactionType: "request"
  };
  const response = await createTransaction(request, transactionData);
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody.transaction).toBeDefined();
  expect(responseBody.transaction.description).toBe(transactionData.description);
});

test("Should submit payment transaction.", async ({ request }) => {
  const transactionData = {
    amount: 10000,
    description: "Example of a payment submit transaction description.",
    privacyLevel: "contacts",
    receiverId: "qywYp6hS0U",
    senderId: "t45AiwidW",
    transactionType: "payment"
  };
  const response = await createTransaction(request, transactionData);
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody.transaction).toBeDefined();
  expect(responseBody.transaction.description).toBe(transactionData.description);
});

test("Should add comment to transaction.", async ({ request }) => {
  const transactionId = "7XaoAWOrn13"; 
  const commentData = {
    content: "This is a test comment."
  };
  const createCommentResponse = await request.post(`/comments/${transactionId}`, {
    data: commentData,
    headers: {
      "Content-Type": "application/json"
    },
  });
  expect(createCommentResponse.status()).toBe(200);
});