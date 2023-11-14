import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

export const useStorage = (key, defaultValue) => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);
  return [value, setValue];
};
