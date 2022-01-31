import createAxios from './http';

export const createNewProfile = async (userId, photoId) => {
  try {
    const response = await createAxios.post('/api/profiles', {
      data: {
        user: userId,
        profilePhoto: photoId
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProfileById = async (userId) => {
  try {
    const response = await createAxios.get('/api/profiles/', {
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

export const getName = async (userId) => {
  try {
    const response = await createAxios.get('/api/profiles/', {
      params: {
        'filters[user][id][$eq]': userId
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const changeName = async (name) => {
  try {
    const responseUser = await createAxios.get(
      'https://uteam-api-7nngy.ondigitalocean.app/api/users/me'
    );
    const responseGetName = await getName(responseUser.data.id);
    const idProfile = responseGetName.data.data[0].id;

    const response = await createAxios.put(`/api/profiles/${idProfile}`, {
      data: { name }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const changeProfilePhoto = async (photoId) => {
  try {
    const responseUser = await createAxios.get(
      'https://uteam-api-7nngy.ondigitalocean.app/api/users/me'
    );
    const responseGetName = await getName(responseUser.data.id);
    const idProfile = responseGetName.data.data[0].id;

    const response = await createAxios.put(`/api/profiles/${idProfile}`, {
      data: {
        profilePhoto: photoId
      }
    });

    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
