import { useEffect, useState } from 'react';
import { getProfileByCompanyId } from '../services/profile';

export const usePendingSingle = (idCompany, profileId) => {


  const [single, setSingle] = useState({
    fetching: true,
    id: null,
    image: '',
    name: '',
    pending: '',
    dateJoined: ''
  });

  const fetchProfileByCompanyId = () => {
    if (idCompany) {
      getProfileByCompanyId(idCompany).then((response) => {
      
        if (response && response.data && response.data.data) {
        
          const profilesOdKompanije = response.data.data.map((profile) => {
            const dateObj = new Date(profile.attributes.createdAt);
            const getOrdinal = (n) => {
              return (
                n +
                (n > 0
                  ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
                  : '')
              );
            };
            const month = dateObj.toLocaleString('default', { month: 'short' });
            const day = dateObj.getUTCDate();
            const year = dateObj.getUTCFullYear();
            const _joined = month + ' ' + getOrdinal(day) + ' ' + year;
            return {
              id: profile.id,
              image: profile.attributes.profilePhoto.data.attributes.url,
              name: profile.attributes.name,
              pending: profile.attributes.status,
              dateJoined: _joined,
            };
          });
      
          profilesOdKompanije.forEach((profile) => {
           
            if (profile.id === profileId) {
              setSingle({
                id: profile.id,
                image: profile.image,
                name: profile.name,
                pending: profile.pending,
              });
            }
          });
        }
      }); 
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setSingle({
      ...single,
      [name]: value
    });
  };

  useEffect(() => {
    fetchProfileByCompanyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCompany]);

  const refresh = fetchProfileByCompanyId;

  return [single, handleChange, refresh, setSingle];
};
