import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import createAxios from '../services/http';
import { login, register } from '../services/auth';
import {
  getProfileById,
  createNewProfile,
  changeName,
  getName,
  changeProfilePhoto
} from '../services/profile';
import { createCompany } from '../services/company';
import { uploadUserPhoto } from '../services/upload';

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState();
  const [username, setUserName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    createAxios
      .get('https://uteam-api-7nngy.ondigitalocean.app/api/users/me')
      .then((res) => {
        setUser(res.data);
        setEmail(res.data.email);
        getName(res.data.id).then((response) => {
          setUserName(response.data.data[0].attributes.name);
        });
        getProfileById(res.data.id).then((response) => {
          setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
          console.log(response.data.data[0].attributes.profilePhoto.data.attributes.url);
        });
        setIsLoggedIn(true);
        navigate(<ProtectedRoute />);
      })
      .catch((err) => {
        setUser(null);
        setIsLoggedIn(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  const registerFunction = async (payload, formData) => {
    try {
      let authUser = await register(payload);
      if (authUser.data.user) {
        setUserName(authUser.data.user.username);
        setEmail(authUser.data.user.email);
        setIsLoggedIn(true);
        setUser(authUser.data);
        console.log('id usera', authUser.data.user.id);
        localStorage.setItem('token', authUser.data.jwt);
        const companyResponse = await createCompany(payload.company);
        const photoResponse = await uploadUserPhoto(formData);
        await createNewProfile(
          authUser.data.user.id,
          photoResponse.data[0].id,
          companyResponse.data.data.id
        );
        const userProfile = await getProfileById(authUser.data.user.id);
        console.log('id profila', userProfile.data.data[0].id);
        setUserPhoto(userProfile.data.data[0].attributes.profilePhoto.data.attributes.url);
        navigate('/my-profile');
      }
    } catch (error) {
      throw error.response.data.error.message;
    }
  };

  const loginFunction = async (payload) => {
    try {
      const authUser = await login(payload);
      setUser(authUser);
      setEmail(authUser.data.user.email);
      getName(authUser.data.user.id).then((response) => {
        setUserName(response.data.data[0].attributes.name);
      });
      getProfileById(authUser.data.user.id).then((response) => {
        setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
      });
      localStorage.setItem('token', authUser.data.jwt);
      setIsLoggedIn(true);
      console.log('id usera', authUser.data.user.id);
      navigate('/my-profile');
      const userProfile = await getProfileById(authUser.data.user.id);
      console.log('id profila', userProfile.data.data[0].id);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  const changeNameFunction = async (name) => {
    try {
      const authUser = await changeName(name);
      setUserName(authUser.data.data.attributes.name);
    } catch (error) {
      console.error(error);
    }
  };

  const changeProfilePhotoFunction = async (formData) => {
    try {
      const photoResponse = await uploadUserPhoto(formData);
      await changeProfilePhoto(photoResponse.data[0].id);
      const responseUser = await createAxios.get(
        'https://uteam-api-7nngy.ondigitalocean.app/api/users/me'
      );
      const responseProfile = await getProfileById(responseUser.data.id);
      setUserPhoto(responseProfile.data.data[0].attributes.profilePhoto.data.attributes.url);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutFunction = () => {
    setUser(null);
    localStorage.removeItem('token');
    setUserPhoto(null);
    setUserName(null);
    setEmail(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginFunction,
        logoutFunction,
        registerFunction,
        changeNameFunction,
        changeProfilePhotoFunction,
        isLoggedIn,
        userPhoto,
        username,
        email
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext, useAuthContext };
