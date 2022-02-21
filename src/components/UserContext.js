import { createContext, useState, useContext, useEffect } from 'react';
import { login, register } from '../services/auth';
import createAxios from '../services/http';
import { useNavigate } from 'react-router-dom';
import { getProfileById, createNewProfile } from '../services/profile';
import { createCompany } from '../services/company';
import { uploadUserPhoto } from '../services/upload';
import ProtectedRoute from '../ProtectedRoute';
const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState();
  const [username, setUserName] = useState();
  const [idCompany, setCompanyId] = useState();
  const fetchData = () => {
    createAxios
      .get('https://uteam-api-7nngy.ondigitalocean.app/api/users/me')
      .then((res) => {
        setUser(res.data);

        getProfileById(res.data.id).then((response) => {
          setUserName(response.data.data[0].attributes.name);
          setCompanyId(response.data.data[0].attributes.company.data.id);
          setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
        });
        setIsLoggedIn(true);
        navigate(<ProtectedRoute />);
      })
      .catch((err) => {
        setUser(null);
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    fetchData();

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

        //here we have two cases: to choose an existing company or to create a new company
        let companyId = null;
        if (payload.company_is_new) {
          const companyResponse = await createCompany(payload.new_company_name);
          companyId = companyResponse.data.data.id;
        } else {
          companyId = parseInt(payload.company);
        }

        const photoResponse = await uploadUserPhoto(formData);
        await createNewProfile(
          authUser.data.user.id,
          photoResponse.data[0].id,
          authUser.data.user.username,
          companyId
        );
        const userProfile = await getProfileById(authUser.data.user.id);
        setUserPhoto(userProfile.data.data[0].attributes.profilePhoto.data.attributes.url);
        setUserPhoto(userProfile.data.data[0].attributes.profilePhoto.data.attributes.url);
      }
    } catch (error) {
      throw error.response.data.error.message;
    }
  };
  const loginFunction = async (payload) => {
    try {
      const authUser = await login(payload);
      setUser(authUser.data.user);
      setUserName(authUser.data.user.username);
      getProfileById(authUser.data.user.id).then((response) => {
        setCompanyId(response.data.data[0].attributes.company.data.id);
        setUserPhoto(response.data.data[0].attributes.profilePhoto.data.attributes.url);
      });

      if (authUser) {
        localStorage.setItem('token', authUser.data.jwt);
        setIsLoggedIn(true);

        navigate('/pending-for-approval');
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
        username,
        idCompany,
        fetchData
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext, useAuthContext };
