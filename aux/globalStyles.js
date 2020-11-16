import { StyleSheet } from 'react-native';
import {
  titleFont, 
  titleFontLarge,
  subtitleFont,
  subtitleFontLarge, 
  scaleSize,
  screenWidth,
  screenHeight
} from './dimensions';

export const globalBorderRadius = 10;

export const globalStyles = StyleSheet.create({
  noMargin: {
    marginTop: 0,
    marginBottom: 0, 
    marginLeft: 0,
    marginTop: 0
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: titleFont
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: '5%',
    marginTop: '5%',
    alignItems: 'center'
  },
  subtitle:{
    color: 'white',
    fontWeight: '400',
    fontSize: subtitleFontLarge
  },
  smallSubtitle:{
    color: 'white',
    fontWeight: '400',
    fontSize: subtitleFont
  },
  textInput: {
    color: 'white',
    marginBottom: '5%',
    marginTop: '5%',
    fontSize: subtitleFontLarge,
    maxWidth: scaleSize(60)
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '3%'
  },
  buttonLabel: {
    color: 'white',
    fontSize: subtitleFontLarge,
    textAlign: 'center'
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonLabelContainer: {
    padding: '3%'
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
