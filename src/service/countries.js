import axios from "axios";

const baseUrl = "https://restcountries.com/v2/all";

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

// GET all countries
export async function getCountries() {
  return await apiClient
    .get(baseUrl)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
