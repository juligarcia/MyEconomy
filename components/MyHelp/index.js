import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MyModal from '../MyModal';
import MyButton from '../MyButton';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { scaleSize, smallSubtitleFont } from '../../aux/dimensions'

const MyHelp = ({ content, buttonStyle, anchor }) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [anchorData, setAnchorData] = useState({ width: 0, height: 0, px: 0, py: 0 });
  const [self, setSelf] = useState(null);
  
  const determineArrowPosition = () => 
    anchorData.py >= scaleSize(50, true)
    ? 'bottom'
    : 'top'

  useEffect(() => {
    if(anchor && openHelp)
      anchor.measure(
        (fx, fy, width, height, px, py) => {
          setAnchorData({ width, height, px, py });
        }
      );
    else if(self && openHelp)
      self.measure(
        (fx, fy, width, height, px, py) => {
          setAnchorData({ width, height, px, py });
        }
      );
  }, [openHelp]);

  const posY = anchorData.py + anchorData.height + scaleSize(3.5, true);
  const posX = anchor ? anchorData.px + anchorData.width / 2 : anchorData.px;

  const styles = StyleSheet.create({
    container: {
      position: 'absolute'
    },
    modal: {
      borderRadius: 10,
      padding: '2%',
      backgroundColor: '#e6e6e6',
      width: '90%',
      top: posY,
      marginLeft: '5%',
      marginRight: '5%',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: scaleSize(1) },
      shadowOpacity: 0.5
    },
    arrow: {
      position: 'absolute'
    }
  });

  return (
    <View ref={setSelf} style={buttonStyle}>
      <MyModal
        arrowPlacement={determineArrowPosition()}
        arrowDisplacement={{
          x: posX,
          y: posY - scaleSize(2)
        }}
        withArrow
        openModal={openHelp}
        content={content}
        containerStyle={styles.modal}
        withClickAway
        onClose={() => setOpenHelp(false)}
      />
      <MyButton
        styles={{
          container: styles.container
        }}
        onPress={() => setOpenHelp(true)}
        content={
          <MaterialCommunityIcons size={smallSubtitleFont} name="checkbox-blank-circle" color="#00ff00" />
        }
      />
    </View>
  );
};

export default MyHelp;