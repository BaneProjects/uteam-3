import createAxios from './http';
export const createCompany = async (name) => {
  try {
    const response = await createAxios.post('/api/companies/', {
      data: {
        name: name
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const getCompany = async (company) => {
  try {
    const response = createAxios.get('/api/companies/' + company, {
      params: {
        populate: ['logo', 'status']
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
export const getCompanyAll = async () => {
  try {
    const response = createAxios.get('/api/companies/', {
      params: {
        'pagination[pageSize]': 100
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
export const updateCompany = async (idCompany, data) => {
  try {
    const response = createAxios.put(
      '/api/companies/' + idCompany,
      {
        data: {
          ...data
        }
      },
      {
        params: {
          populate: ['logo']
        }
      }
    );
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
