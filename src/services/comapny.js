import createAxios from './http';


export const createCompany = async (userId, companyName) => {
    try {
      const response = await createAxios.post('/api/companies', {
        data: {
          user: userId,
          name: companyName
        }
      });
      return response;
    } catch (error) {
      console.log('An error occurred:', error.response);
    }
  };
  
