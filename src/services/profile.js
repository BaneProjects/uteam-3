import createAxios from './http';


export const createUserProfile = async (userId, photoId) => {
  try {
    const response = await createAxios.post('/api/profiles', {
      data: {
        user: userId,
        profilePhoto: photoId
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await createAxios.get('/api/profiles', {
      params: {
        'filters[user][id][$eq]': userId,
        populate: 'profilePhoto'
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
