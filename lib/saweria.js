import axios from "axios";
/* LIST SERVER DOMAIN
 * https://rosalyn.my.id
 * https://aubert.my.id
 * https://clayza.biz.id
 */
const SERVER_DOMAIN = "https://clayza.biz.id";

async function login(email, password) {
  try {
    const response = await axios.post(`${SERVER_DOMAIN}/api/saweria/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response
      ? error.response.data
      : { error: "Unknown error occurred" };
  }
}

async function createPayment(user_id, amount, name, email, msg) {
  try {
    const response = await axios.post(
      `${SERVER_DOMAIN}/api/saweria/createPayment`,
      { user_id, amount, name, email, msg },
    );
    return response.data;
  } catch (error) {
    return error.response
      ? error.response.data
      : { error: "Unknown error occurred" };
  }
}

async function checkPayment(user_id, payment_id) {
  try {
    const response = await axios.get(
      `${SERVER_DOMAIN}/api/saweria/checkPayment/${user_id}/${payment_id}`,
    );
    return response.data;
  } catch (error) {
    return error.response
      ? error.response.data
      : { error: "Unknown error occurred" };
  }
}

async function getBalance(email, password) {
  try {
    const response = await axios.post(`${SERVER_DOMAIN}/api/saweria/balance`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response
      ? error.response.data
      : { error: "Unknown error occurred" };
  }
}

export { login, createPayment, checkPayment, getBalance };
