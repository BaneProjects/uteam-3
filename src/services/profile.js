import createAxios from './http';
export const createNewProfile = async (userId, photoId, nameProfile, companyId) => {
  try {
    const response = await createAxios.post('/api/profiles', {
      data: {
        user: userId,
        company: companyId,
        profilePhoto: photoId,
        name: nameProfile,
        status: 'pending'
      }
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getProfileById = async (userId) => {
  try {
    const response = await createAxios.get(`/api/profiles/`, {
      params: {
        'filters[user][id][$eq]': userId,
        populate: ['profilePhoto', 'company']
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};
export const getProfileByCompanyId = async (companyId) => {
  try {
    const response = await createAxios.get(`/api/profiles/`, {
      params: {
        'filters[company][id][$eq]': companyId,
        populate: ['profilePhoto,', 'company']
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};

export const DeliteProfileById = async (idProfile) => {
  try {
    const response = await createAxios.delete(`/api/profiles/` + idProfile);
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};


export const ChangeUserStatusById = async (idProfile) => {
  try {
    const response = await createAxios.put(`/api/profiles/` + idProfile, {
      data: {
        status: 'published'
      }
    });
    return response;
  } catch (error) {
    console.log('An error occurred:', error.response);
  }
};