import { uploadUserPhoto } from './upload';
import createAxios from './http';

export const apiEditPendingDetails = async (formData, userData) => {
  const uploadResponse = await uploadUserPhoto(formData);

  try {
    const id = userData.id;
    const response = await createAxios.put(
      '/api/profiles/' + id,
      {
        data: {
          name: userData.name,
          profilePhoto: uploadResponse.data[0].id
        }
      },
      {
        params: {
          populate: ['profilePhoto']
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};