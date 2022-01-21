import createAxios from './http';

export const createCompany = async (companyName) => {
  try {
    const response = await createAxios.post('/api/companies', {
      data: {
        name: companyName
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

