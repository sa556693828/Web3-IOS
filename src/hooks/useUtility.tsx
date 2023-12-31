import {useCallback, useContext, useState} from 'react';
import axios from 'axios';
import {useStorage} from './useStorge';

export default function useUtility() {
  const userVID = useStorage('userVid');
  const [userVid, setUserVid] = userVID;
  const UserTOKEN = useStorage('userToken');
  const [userToken, setUserToken] = UserTOKEN;
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const URL = 'https://yohaku.soooul.xyz/api/v1/utilities';
  const adminURL = 'https://yohaku.soooul.xyz/api/v1/admin/utilities';

  const getUtilities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(URL, {
        withCredentials: true,
        headers: {
          Cookie: `uvid=${userVid}; token=${userToken}`,
        },
      });
      setData(res.data.data.data);
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  }, []);

  const getUtility = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/${uid}`, {
        withCredentials: true,
        headers: {
          Cookie: `uvid=${userVid}; token=${userToken}`,
        },
      });
      setData(res.data.data.data);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return {
    data,
    error,
    loading,
    success,
    getUtilities,
    getUtility,
  };
}
