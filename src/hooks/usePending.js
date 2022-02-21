import { useEffect, useState } from 'react';
import { getProfileByCompanyId } from '../services/profile';

export const usePending = (idCompany) => {
  const [profiles, setProfiles] = useState({
    data: [],
    fetching:true
  }); // svi korisnici/profili od jedne kompanije

  const fetchProfileByCompanyId = () => {
    if (idCompany) {
      getProfileByCompanyId(idCompany).then((response) => {
        console.log(response)
        if (response && response.data && response.data.data) {
          const profilesOdKompanije = response.data.data.map((profile) => {
            
            if(profile.attributes.status === "pending"){}
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
              status: profile.attributes.status,
              dateJoined: _joined
            };
            
          
          });
              
          setProfiles({
            data: profilesOdKompanije,
          
          });
        }
      }); 
    }
  };

  useEffect(() => {
    fetchProfileByCompanyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idCompany]);

  const refresh = fetchProfileByCompanyId;

  return [profiles, refresh];
};
