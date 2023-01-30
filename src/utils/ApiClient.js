import { API_URL } from '../config/env';

class ApiClient {
  baseUrl = API_URL;

  async get(path) {
    const response = await fetch(`${this.baseUrl}${path}`);

    return response.json();
  }

  async post(path, payload) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }
}

export const apiClient = new ApiClient();
