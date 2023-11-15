import {useCallback, useContext, useState} from 'react';
import axios from 'axios';
import {MarketContext} from '../context/MarketProvider';
import {useStorage} from './useStorge';

export default function useLogin() {
  // const {logIn} = useContext(MarketContext);
  const [loginStatus, setLoginStatus] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginAccountURL = 'https://yohaku.soooul.xyz/api/v1/login/account_ios';

  const loginAccount = useCallback(
    async (account: string, password: string) => {
      setLoading(true);
      try {
        const res = await axios.post(loginAccountURL, {
          account: account,
          password: password,
        });
        setLoginStatus(res.data);
        return res.data;
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    },
    [],
  );

  return {loginStatus, error, loading, loginAccount};
}
