async function createTransaction(request, transactionData) {
    const response = await request.post("/transactions", {
      data: transactionData,
      headers: {
        "Content-Type": "application/json"
      },
    });
    return response;
  }


  
async function postRequest(request, endpoint, data) {
    const response = await request.post(endpoint, {
      data: data,
      headers: {
        "Content-Type": "application/json"
      },
    });
    return response;
  }
  
async function getRequest(request, endpoint) {
    const response = await request.get(endpoint);
    return response;
  }
  
async function deleteRequest(request, endpoint) {
    const response = await request.delete(endpoint, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response;
  }
  
module.exports = { postRequest, getRequest, deleteRequest, createTransaction };