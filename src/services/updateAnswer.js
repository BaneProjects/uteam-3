import createAxios from './http';
export const updateAnswer = async (idAnswer, data) => {
  try {
    const response = createAxios.put('/api/answers/' + idAnswer, {
      data: {
        ...data
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const updateAnswerWithPhoto = async (formData) => {
  try {
    const response = await createAxios.post('/api/upload/', formData, {
      params: {
        populate: ['company,', 'answers']
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
