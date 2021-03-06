import { Dimensions } from  "react-native";

export const screenWidth = Math.round(Dimensions.get('screen').width);
export const screenHeight = Math.round(Dimensions.get('screen').height);

export const scaleSize = (amount, height = false) => 
  (height ? screenHeight : screenWidth) * amount / 100;

export const titleFont = scaleSize(6);
export const titleFontLarge = scaleSize(7);
export const subtitleFont = scaleSize(4);
export const subtitleFontLarge = scaleSize(5);
export const smallSubtitleFont = scaleSize(3);
export const xsmallSubtitleFont = scaleSize(2);
