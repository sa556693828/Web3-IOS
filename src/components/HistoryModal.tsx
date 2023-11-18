import React from 'react';
import {Text, Box, HStack, Button} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList, Modal} from 'react-native';
import {historyList} from './NFTPage';

interface HistoryModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  data: historyList[];
  changeData: (index: number) => void;
  setDisBounce: (disBounce: boolean) => void;
}

const HistoryModal = ({
  showModal,
  setShowModal,
  data,
  changeData,
  setDisBounce,
}: HistoryModalProps) => {
  const StyledBox = styled(Box);
  const StyledBg = styled(LinearGradient);
  const StyledModal = styled(Modal);
  const StyledText = styled(Text);
  const StyledHStack = styled(HStack);
  const StyledButton = styled(Button);

  const Item = ({name, date, index}: any) => {
    return (
      <StyledHStack className="py-4 justify-between border-t border-white/20">
        <StyledButton
          className="flex justify-between p-0 w-full bg-transparent"
          onPress={() => changeData(index)}>
          <StyledText className="text-white font-normal text-sm leading-[120%] tracking-[1.12px]">
            {name}
          </StyledText>
          <StyledText className="text-white font-normal text-sm leading-[120%] tracking-[1.12px]">
            {date}
          </StyledText>
        </StyledButton>
      </StyledHStack>
    );
  };
  const renderItem = ({item, index}: any) => (
    <Item name={item.name} date={item.create_time} index={index} />
  );
  return (
    <StyledModal
      className="bg-black"
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
        setDisBounce(true);
      }}
      animationType="slide"
      presentationStyle="pageSheet">
      <StyledBg
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.0, y: 1.0}}
        locations={[0, 0.45]}
        colors={['#6A7460', '#131111']}
        className="flex h-full justify-start items-center pt-[120px] px-4">
        <StyledBox className="flex w-full text-left pb-20">
          <StyledText className="text-white text-5xl font-semibold">
            Odyssey
          </StyledText>
        </StyledBox>
        <StyledBox className="flex w-full text-white/40 text-sm tracking-[1.12px]">
          <StyledHStack className="justify-between border-b border-white/20 pb-4">
            <StyledText className="uppercase font-normal">
              experience
            </StyledText>
            <StyledText className="uppercase font-normal">date</StyledText>
          </StyledHStack>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
        </StyledBox>
      </StyledBg>
    </StyledModal>
  );
};

export default HistoryModal;
