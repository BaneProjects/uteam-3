import { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../services/auth';
import { uploadUserPhoto } from '../services/upload';
import { createUserProfile, getUserProfile } from '../services/profile';
import { getCompany, createCompany } from '../services/comapny';
import { useNavigate } from 'react-router-dom';
import createAxios from '../services/http';
import ProtectedRoute from '../ProtectedRoute';

const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [companyName, setCompanyName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    createAxios
      .get('https://uteam-api-7nngy.ondigitalocean.app/api/users/me')
      .then((res) => {
        setUserName(res.data.username);
        getUserProfile(res.data.id).then((response) => {
          console.log(response);
          setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
        });
        setIsLoggedIn(true);
        setUser(res.data);
        setUserPhoto();
        navigate(<ProtectedRoute />);
      })
      .catch((err) => {
        setUser(null);
        setIsLoggedIn(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerFunction = async (payload, formData) => {
    try {
      const authUser = await register(payload);
      if (authUser.data.user) {
        setIsLoggedIn(true);
        setUser(authUser.data);
        setUserName(authUser.data.user.username);
        localStorage.setItem('token', authUser.data.jwt);
        const userProfilePhoto = await uploadUserPhoto(formData);
        await createUserProfile(authUser.data.user.id, userProfilePhoto.data[0].id);
        const userProfile = await getUserProfile(authUser.data.id);
        console.log('userProfile', userProfile);
        setUserPhoto(userProfile.data.data[0].attributes.profilePhoto.data.attributes.url);
        await createCompany(authUser.data.user.id, authUser.data.user.username + "'s companies");
        navigate('/my-profile');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginFunction = async (payload) => {
    try {
      const authUser = await login(payload);
      console.log(payload);
      setUserName(authUser.data.user.username);
      getUserProfile(authUser.data.user.id).then((response) => {
        setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
      });
      if (authUser) {
        localStorage.setItem('token', authUser.data.jwt);
        setIsLoggedIn(true);
        setUser(authUser);
        navigate('/my-profile');
        console.log('ovov', authUser.data.user.username + "'s companies");
      } else {
        console.log('failed login');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  const logoutFunction = () => {
    setUser(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName(null);
    setUserPhoto(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginFunction,
        logoutFunction,
        registerFunction,
        isLoggedIn,
        userPhoto,
        userName
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuthContext };
