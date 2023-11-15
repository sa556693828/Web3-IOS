import {useCallback, useState} from 'react';
import axios from 'axios';
import {useStorage} from './useStorge';

export interface OrderInput {
  user_view_id: string;
  utility_vid: string;
  remark: string;
}

export default function useOrder() {
  const [data, setData] = useState<Array<any>>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const userVID = useStorage('userVid');
  const [userVid, setUserVid] = userVID;
  const UserTOKEN = useStorage('userToken');
  const [userToken, setUserToken] = UserTOKEN;

  const URL = 'https://yohaku.soooul.xyz/api/v1/orders';

  //get user order
  const getUserOrders = useCallback(
    async (type?: 'utility' | 'NFT', status?: number) => {
      setLoading(true);
      const defaultType = type || 'utility';
      const defaultStatus = status || -1;
      try {
        if (defaultType === 'utility') {
          const res = await axios.get(URL, {
            withCredentials: true,
            headers: {
              Cookie: `uvid=${userVid}; token=${userToken}`,
            },
            params: {type: 2, status: defaultStatus},
          });
          setData(res.data.data.data);
        }
        if (defaultType === 'NFT') {
          const res = await axios.get(URL, {
            withCredentials: true,
            headers: {
              Cookie: `uvid=${userVid}; token=${userToken}`,
            },
            params: {type: 1, status: defaultStatus},
          });
          setData(res.data.data.data);
        }
        setSuccess(true);
      } catch (error: any) {
        console.log(error);
        setError(true);
      }
      setLoading(false);
    },
    [],
  );

  return {
    data,
    error,
    loading,
    success,
    getUserOrders,
  };
}
