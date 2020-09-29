import { Dimensions } from  "react-native";

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

export const scaleSize = amount => screenWidth * amount / 100;

export const titleFont = scaleSize(6);
export const titleFontLarge = scaleSize(7);
export const subtitleFont = scaleSize(4);
export const subtitleFontLarge = scaleSize(5);
