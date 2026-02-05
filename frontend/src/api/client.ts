const API_BASE_URL = 'https://localhost:7123'; // SCHIMB cu portul tău!

export const testApi = async () => {
  try {
    const response = await fetch({$API_BASE_URL}/api/test);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getDataApi = async () => {
  try {
    const response = await fetch({$API_BASE_URL}/api/test/data);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
