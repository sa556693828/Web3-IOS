import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text, Box, Spinner, Button} from '@gluestack-ui/themed';
import {styled} from 'nativewind';
import {useStorage} from '../hooks/useStorge';
import QRCode from 'react-native-qrcode-svg';
import useUtility from '../hooks/useUtility';

interface Props {
  rowData: any;
  index: number;
}

const OrderRow = ({rowData, index}: Props) => {
  const userVID = useStorage('userVid');
  const [userVid, setUserVid] = userVID;
  const UserTOKEN = useStorage('userToken');
  const [userToken, setUserToken] = UserTOKEN;
  const StyledBox = styled(Box);
  const StyledText = styled(Text);
  const StyledImage = styled(Image);
  const StyledButton = styled(Button);
  const [open, setOpen] = useState<boolean>(false);
  const {data: utData, getUtility} = useUtility();

  useEffect(() => {
    getUtility(rowData?.goods_id);
  }, [index]);

  return (
    <StyledBox
      className={`flex flex-row items-center justify-between py-8 space-x-4`}
      key={index}>
      <StyledBox className="w-2/3 h-32">
        <StyledImage
          className="rounded-lg w-full h-full"
          source={{
            uri: utData?.imgs,
          }}
        />
        <StyledText className="text-xl uppercase text-white">
          {utData?.title}
        </StyledText>
      </StyledBox>

      <StyledBox className="flex w-1/4 justify-center">
        <StyledButton
          className={`rounded-lg h-16 w-full flex items-center justify-center text-center ${
            rowData?.status === 20 ? 'bg-white/40' : 'bg-white'
          }`}
          disabled={rowData?.status === 20}
          onPress={() => setOpen(true)}>
          <StyledText className="text-black text-xs font-medium text-center uppercase">
            {rowData?.status < 10
              ? 'check in'
              : rowData?.status === 10
              ? 'check out'
              : rowData?.status === 20
              ? 'finish'
              : 'fix'}
          </StyledText>
        </StyledButton>
      </StyledBox>
      {open && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={open}
          onRequestClose={() => {
            setOpen(false);
          }}>
          <TouchableWithoutFeedback onPress={() => setOpen(false)}>
            <StyledBox
              className="flex h-full justify-center items-center bg-white/80"
              onPointerMove={() => {
                setOpen(!open);
              }}>
              <QRCode
                value={
                  rowData?.status === 20
                    ? JSON.stringify({
                        vid: rowData?.view_id,
                        method: 'checkOut',
                      })
                    : JSON.stringify({vid: rowData?.view_id, method: 'checkIn'})
                }
                size={300}
                color="#000"
                backgroundColor="#fff"
              />
            </StyledBox>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </StyledBox>
  );
};

export default OrderRow;
