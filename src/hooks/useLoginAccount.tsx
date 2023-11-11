import {useCallback, useContext, useState} from 'react';
import axios from 'axios';

export default function useLoginAccount() {
  const [accountData, setAccountData] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const URL = 'https://yohaku.soooul.xyz/api/v1/login_mode/account';

  const getAccount = useCallback(async (uid: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/${uid}`);
      setAccountData(res.data.data.data);
      return res.data;
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return {
    accountData,
    error,
    loading,
    getAccount,
  };
}
