import {useCallback, useState} from 'react';
import axios from 'axios';
import {useStorage} from './useStorge';

export default function useHistory() {
  const [historyList, setHistoryList] = useState<Array<any>>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const userVID = useStorage('userVid');
  const [userVid, setUserVid] = userVID;
  const UserTOKEN = useStorage('userToken');
  const [userToken, setUserToken] = UserTOKEN;

  const basicURL =
    'https://yohaku.soooul.xyz/api/v1/admin/utility_dynamic_history';

  const getHistories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(basicURL, {
        withCredentials: true,
        headers: {
          Cookie: `uvid=${userVid}; token=${userToken}`,
        },
      });
      setHistoryList(res.data.data.data);
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  }, []);

  // get history utility
  const getHistory = useCallback(async (uvid: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${basicURL}/${uvid}`, {
        withCredentials: true,
        headers: {
          Cookie: `uvid=${userVid}; token=${userToken}`,
        },
      });
      setHistoryList(res.data.data.data);
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      setError(true);
    }
    setLoading(false);
  }, []);

  return {
    historyList,
    error,
    loading,
    success,
    getHistory,
    getHistories,
  };
}
