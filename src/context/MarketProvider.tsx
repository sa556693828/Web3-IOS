import {createContext, useCallback, useEffect, useState} from 'react';
import useUser from '../hooks/useUser';

export const MarketContext = createContext<{
  userVid: string;
  logIn: (user_vid: string) => void;
  logOut: () => void;
}>({
  userVid: '',
  logIn: () => {},
  logOut: () => {},
});
interface Cookies {
  [key: string]: string;
}

export const MarketProvider = ({children}: {children: any}) => {
  const [userVid, setUserVid] = useState('');
  const {getUser} = useUser();

  // function getCookies() {
  //   const cookiesString = document.cookie;
  //   const cookiesArray = cookiesString.split('; ');
  //   const cookies: Cookies = {};
  //   cookiesArray.forEach(cookie => {
  //     const [key, value] = cookie.split('=');
  //     cookies[key] = value;
  //   });
  //   if (cookies.uvid) {
  //     setUserVid(cookies.uvid);
  //   }
  // }

  function logIn(user_vid: string) {
    setUserVid(user_vid);
  }
  function logOut() {
    setUserVid('');
  }
  // useEffect(() => {
  //   if (account) getAddressHasMintPass();
  // }, [account]);

  return (
    <MarketContext.Provider
      value={{
        userVid,
        logIn,
        logOut,
      }}>
      {children}
    </MarketContext.Provider>
  );
};
