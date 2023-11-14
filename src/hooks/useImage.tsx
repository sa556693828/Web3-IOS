import {useCallback, useContext, useState} from 'react';
import axios from 'axios';
import {useStorage} from './useStorge';

export default function useImage() {
  const [image, setImage] = useState<string>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const URL = 'https://yohaku.soooul.xyz/api/v1/imgs';
  const userVID = useStorage('userVid');
  const [userVid, setUserVid] = userVID;
  const UserTOKEN = useStorage('userToken');
  const [userToken, setUserToken] = UserTOKEN;
  const getImage = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/${id}`, {
        withCredentials: true,
        headers: {
          Cookie: `uvid=${userVid}; token=${userToken}`,
        },
      });
      setImage(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  return {
    image,
    error,
    loading,
    getImage,
  };
}
