import {useCallback, useContext, useState} from 'react';
import axios from 'axios';
import {MarketContext} from '../context/MarketProvider';

export default function useLogin() {
  const {logIn} = useContext(MarketContext);
  const [loginStatus, setLoginStatus] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginCodeURL = 'https://yohaku.soooul.xyz/api/v1/login/access_code';
  const loginAccountURL = 'https://yohaku.soooul.xyz/api/v1/login/account';

  const loginCode = useCallback(async (code: string) => {
    setLoading(true);
    try {
      const res = await axios.post(loginCodeURL, {access_code: code});
      setLoginStatus(res.data);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  const loginAccount = useCallback(
    async (account: string, password: string) => {
      setLoading(true);
      try {
        const res = await axios.post(loginAccountURL, {
          account: account,
          password: password,
        });
        setLoginStatus(res.data);
        logIn(res.data.data.data[0].view_id);
        return res.data;
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    },
    [],
  );

  return {loginStatus, error, loading, loginCode, loginAccount};
}
