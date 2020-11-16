import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MyModal from '../MyModal';
import MyButton from '../MyButton';
import { scaleSize, smallSubtitleFont } from '../../aux/dimensions';
import { globalStyles } from '../../aux/globalStyles';

const MyHelp = ({ content, buttonStyle, anchor, spaceBetween = 3.5 }) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [anchorData, setAnchorData] = useState({ width: 0, height: 0, px: 0, py: 0 });
  const [self, setSelf] = useState(null);
  const [modalHeight, setModalHeight] = useState(undefined);

  const determineArrowPosition = () => (anchorData.py >= scaleSize(50, true) ? 'bottom' : 'top');

  useEffect(() => {
    if (anchor && openHelp)
      anchor.measure((fx, fy, width, height, px, py) => {
        setAnchorData({ width, height, px, py });
      });
    else if (self && openHelp)
      self.measure((fx, fy, width, height, px, py) => {
        setAnchorData({ width, height, px, py });
      });
  }, [openHelp]);

  const posY = anchorData.py + anchorData.height + scaleSize(spaceBetween, true);
  const posX = anchorData.px + anchorData.width / 2;

  const styles = StyleSheet.create({
    modal: {
      borderRadius: 10,
      padding: '2%',
      backgroundColor: '#E6E6E6',
      width: '97%',
      top: posY,
      marginLeft: '1.5%',
      marginRight: '1.5%',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: scaleSize(1) },
      shadowOpacity: 0.5,
    },
    arrow: {
      position: 'absolute',
    },
    button: {
      height: smallSubtitleFont + scaleSize(2.5),
      width: smallSubtitleFont + scaleSize(2.5),
    },
  });

  const arrowPlacement = determineArrowPosition();
  const upRight = arrowPlacement === 'top';

  return (
    <View style={buttonStyle}>
      <MyModal
        withBlur
        setModalHeight={setModalHeight}
        arrowPlacement={arrowPlacement}
        arrowDisplacement={{
          x: posX,
          y: upRight ? posY : posY + modalHeight,
        }}
        withArrow
        openModal={openHelp}
        content={content}
        containerStyle={styles.modal}
        withClickAway
        onClose={() => setOpenHelp(false)}
      />
      <MyButton
        onPress={() => setOpenHelp(true)}
        content={(
          <View ref={setSelf} style={[globalStyles.centered, styles.button]}>
            <MaterialCommunityIcons size={smallSubtitleFont} name="checkbox-blank-circle" color="#00FF00" />
          </View>
        )}
      />
    </View>
  );
};

export default MyHelp;
