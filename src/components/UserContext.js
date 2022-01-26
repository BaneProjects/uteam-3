import { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../services/auth';
import createAxios from '../services/http';
import { useNavigate } from 'react-router-dom';
import { getProfile, createNewProfile } from '../services/profile';
import { createCompany } from '../services/company';
import { uploadUserPhoto } from '../services/upload';
import ProtectedRoute from '../ProtectedRoute';
const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState();
  const [username, setUserName] = useState();
  useEffect(() => {
    createAxios
      .get('https://uteam-api-7nngy.ondigitalocean.app/api/users/me')
      .then((res) => {
        setUser(res.data);
        setUserName(res.data.username);
        getProfile(res.data.id).then((response) => {
          setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
        });
        setIsLoggedIn(true);
        navigate(<ProtectedRoute />);
      })
      .catch((err) => {
        setUser(null);
        setIsLoggedIn(false);
        // navigate('/');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  const registerFunction = async (payload, formData) => {
    try {
      let authUser = await register(payload);
      if (authUser.data.user) {
        setUserName(authUser.data.user.username);
        setIsLoggedIn(true);
        setUser(authUser.data);
        localStorage.setItem('token', authUser.data.jwt);
        let companyRes = await createCompany(payload.company);
        const photoResponse = await uploadUserPhoto(formData);
        await createNewProfile(
          authUser.data.user.id,
          photoResponse.data[0].id,
          companyRes.data.data.id
        );
        const userProfile = await getProfile(authUser.data.user.id);
        setUserPhoto(userProfile.data.data[0].attributes.profilePhoto.data.attributes.url);
        navigate('/my-profile');
      }
    } catch (error) {
      // console.error(error);
      throw error.response.data.error.message
    }
  };

  const loginFunction = async (payload) => {
    try {
      const authUser = await login(payload);

      setUserName(authUser.data.user.username);
      getProfile(authUser.data.user.id).then((response) => {
        setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
      });

      if (authUser) {
        localStorage.setItem('token', authUser.data.jwt);
        setIsLoggedIn(true);
        setUser(authUser);

        navigate('/my-profile');
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
    setUserPhoto(null);
    setUserName(null);
    setIsLoggedIn(false);
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
        username
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext, useAuthContext };
