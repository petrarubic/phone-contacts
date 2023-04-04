import axios from "axios";

const baseUrl = "https://604868d1b801a40017ccdac6.mockapi.io/api/v1/subscriber";

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

// GET all contacts
export async function getContacts() {
  return await apiClient
    .get(baseUrl)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

// POST new contact data
export async function addContact(data) {
  return await apiClient
    .post(baseUrl, data)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });
}
