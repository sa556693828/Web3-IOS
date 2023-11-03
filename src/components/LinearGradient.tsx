import LinearGradient from 'react-native-linear-gradient';
import {styled} from '@gluestack-ui/themed';

const MyLinearGradient = styled(
  LinearGradient,
  {},

  {
    resolveProps: ['colors'],
  },
  {
    propertyTokenMap: {
      colors: 'colors',
    },
    propertyResolver: {
      colors: (rawValue: any, resolver: any) => {
        rawValue.forEach((color: any, index: number) => {
          rawValue[index] = resolver(color);
        });
        return rawValue;
      },
    },
  },
);
