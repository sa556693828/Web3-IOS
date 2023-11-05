import React from 'react';
import {Text, Box, HStack} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import LinearGradient from 'react-native-linear-gradient';
import {FlatList, Modal} from 'react-native';

interface HistoryModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

const HistoryModal = (props: HistoryModalProps) => {
  const {showModal, setShowModal} = props;
  const history = [
    {
      name: 'Workshop',
      date: '2021-10-10',
    },
    {
      name: 'adornment',
      date: '2021-10-10',
    },
    {
      name: 'gallery',
      date: '2021-10-10',
    },
    {
      name: 'flagship store',
      date: '2021-10-10',
    },
    {
      name: 'YOHAKU Minting',
      date: '2021-10-10',
    },
  ];
  const StyledBox = styled(Box);
  const StyledBg = styled(LinearGradient);
  const StyledModal = styled(Modal);
  const StyledText = styled(Text);
  const StyledHStack = styled(HStack);

  const Item = ({title, date}: any) => {
    return (
      <StyledHStack className="py-8 justify-between border-t border-white/20 ">
        <StyledText className="text-white font-normal text-sm leading-[120%] tracking-[1.12px]">
          {title}
        </StyledText>
        <StyledText className="text-white font-normal text-sm leading-[120%] tracking-[1.12px]">
          {date}
        </StyledText>
      </StyledHStack>
    );
  };
  const renderItem = ({item}: any) => (
    <Item title={item.name} date={item.date} />
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
        className="flex h-full justify-start items-center pt-[120px] px-4">
        <StyledBox className="flex w-full text-left pb-20">
          <StyledText className="text-white text-5xl">Odyssey</StyledText>
        </StyledBox>
        <StyledBox className="flex w-full text-white/40 text-sm tracking-[1.12px]">
          <StyledHStack className="justify-between border-b border-white/20 pb-4">
            <StyledText className="uppercase font-normal">
              experience
            </StyledText>
            <StyledText className="uppercase font-normal">date</StyledText>
          </StyledHStack>
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={item => item.name}
          />
        </StyledBox>
      </StyledBg>
    </StyledModal>
  );
};

export default HistoryModal;
