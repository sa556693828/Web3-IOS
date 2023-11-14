import {useCallback, useContext, useState} from 'react';
import axios from 'axios';
import {useStorage} from './useStorge';

export default function useUser() {
  const userVID = useStorage('userVid');
  const [userVid, setUserVid] = userVID;
  const UserTOKEN = useStorage('userToken');
  const [userToken, setUserToken] = UserTOKEN;

  const [data, setData] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const URL = 'https://yohaku.soooul.xyz/api/v1/users';

  const getUser = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/${uid}`, {
        withCredentials: true,
        headers: {
          Cookie: `uvid=${userVid}; token=${userToken}`,
        },
      });
      setData(res.data.data.data);
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return {
    data,
    error,
    loading,
    getUser,
    success,
  };
}
