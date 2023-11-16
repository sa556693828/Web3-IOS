import React from 'react';
import {Text, Box, HStack, Button} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList, Modal} from 'react-native';
import {historyList} from './NFTPage';
import OrderRow from './OrderRow';
import {ArrowBigLeft, RotateCcw} from 'lucide-react-native';

interface HistoryModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  data: any;
  trigger: () => void;
}

const OrderModal = ({
  showModal,
  setShowModal,
  data,
  trigger,
}: HistoryModalProps) => {
  const StyledBox = styled(Box);
  const StyledBg = styled(LinearGradient);
  const StyledModal = styled(Modal);
  const StyledHStack = styled(HStack);
  const StyledButton = styled(Button);

  const renderItem = ({item, index}: any) => (
    <StyledBox className="">
      <OrderRow rowData={item} index={index} />
    </StyledBox>
  );
  return (
    <StyledModal
      className="bg-black"
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      animationType="slide"
      presentationStyle="pageSheet">
      <StyledBg
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.0, y: 1.0}}
        locations={[0, 0.45]}
        colors={['#6A7460', '#131111']}
        className="flex h-full justify-start items-center pt-[80px] px-4">
        <StyledBox className="flex items-start w-full">
          <StyledBox className="flex flex-row space-x-6 items-center">
            <StyledButton
              className={`w-full flex items-start justify-start text-start bg-transparent p-0 pt-[2px]`}
              onPress={trigger}>
              <RotateCcw color="white" size="30" />
            </StyledButton>
          </StyledBox>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </StyledBox>
      </StyledBg>
    </StyledModal>
  );
};

export default OrderModal;
