import {useCallback, useContext, useState} from 'react';
import axios from 'axios';

export default function useUser() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const URL = 'https://yohaku.soooul.xyz/api/v1/users';

  const getUser = useCallback(async (uid: string) => {
    console.log('uid,uid', uid);
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/${uid}`);
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
