import {createContext, useCallback, useEffect, useState} from 'react';
import {useStorage} from '../hooks/useStorge';
import useUser from '../hooks/useUser';

export const MarketContext = createContext<{
  userVid: string;
  logIn: (user_vid: string) => void;
  logOut: () => void;
  trigger: () => void;
  firstTrigger: boolean;
}>({
  userVid: '',
  logIn: () => {},
  logOut: () => {},
  trigger: () => {},
  firstTrigger: false,
});
interface Cookies {
  [key: string]: string;
}

export const MarketProvider = ({children}: {children: any}) => {
  const [userVid, setUserVid] = useState('');
  const [firstTrigger, setFirstTrigger] = useState(false);
  const {getUser} = useUser();
  const contextData = useStorage('userVid');
  const [userVids] = contextData;

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
  function trigger() {
    setFirstTrigger(!firstTrigger);
  }
  useEffect(() => {
    if (userVids) logIn(userVids);
  }, [userVids]);

  return (
    <MarketContext.Provider
      value={{
        userVid,
        firstTrigger,
        logIn,
        logOut,
        trigger,
      }}>
      {children}
    </MarketContext.Provider>
  );
};
