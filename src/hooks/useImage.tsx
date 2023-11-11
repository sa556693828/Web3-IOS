import {useCallback, useContext, useState} from 'react';
import axios from 'axios';

export default function useImage() {
  const [image, setImage] = useState<any>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const URL = 'https://yohaku.soooul.xyz/api/v1/imgs';

  const getImage = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`${URL}/${id}`);
      setImage(res.data);
      console.log('getImage', res.data.data.data);
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
