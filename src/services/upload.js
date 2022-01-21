import createAxios from './http';

export const uploadUserPhoto = async (formData) => {
  try {
    const response = await createAxios.post('/api/upload/', formData);
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
