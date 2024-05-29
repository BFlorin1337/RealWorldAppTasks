const { test, expect } = require('@playwright/test');
const { testUser } = require('../../data/users');
const { loggedInUserApiContext } = require('../../utilities/apiUtilities');

test.beforeAll(async ({ playwright, request }) => {
  await loggedInUserApiContext(playwright, request, testUser);
});

test("Should submit payment request transaction.", async ({ request }) => {
  const transactionData = await request.post("/transactions", {
    data: {
      amount: 10000,
      description: "Example of a payment request transaction description.",
      privacyLevel: "contacts",
      receiverId: "qywYp6hS0U",
      senderId: "t45AiwidW",
      transactionType: "request"
    },
  });
  expect(transactionData.ok()).toBeTruthy();
  const responseBody = await transactionData.json();
  expect(responseBody.transaction).toBeDefined();
});

test("Should submit payment transaction.", async ({ request }) => {
  const transactionData = await request.post("/transactions", {
    data: {
      amount: 1000000,
      description: "Example of a payment submit transaction description.",
      privacyLevel: "contacts",
      receiverId: "qywYp6hS0U",
      senderId: "t45AiwidW",
      transactionType: "payment"
    },
  });

  // Assert that the request was successful
  expect(transactionData.ok()).toBeTruthy();

  // Parse the response body as JSON
  const responseBody = await transactionData.json();
  console.log(responseBody);

  // Assert that the transaction object is defined
  expect(responseBody.transaction).toBeDefined();

  // Assert that the amount in the response matches the amount in the request
  expect(responseBody.transaction.amount).toBe(transactionData.data.amount);

  // Optionally, log the transaction data for debugging
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