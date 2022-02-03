import createAxios from './http';

export const addNewQuestion = async ({ text, type, order }) => {
  try {
    const response = await createAxios.post('/api/questions', {
      data: {
        text,
        type,
        order
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getQuestions = async () => {
  try {
    const response = await createAxios.get('/api/questions');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

