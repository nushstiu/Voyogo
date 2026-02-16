const API_BASE_URL = 'https://localhost:7123';

export const testApi = async () => {
  const response = await fetch(`${API_BASE_URL}/api/test`);
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  return data;
};

export const getDataApi = async () => {
  const response = await fetch(`${API_BASE_URL}/api/test/data`);
  if (!response.ok) throw new Error('Network error');
  const data = await response.json();
  return data;
};