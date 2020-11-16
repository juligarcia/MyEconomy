import { StyleSheet } from 'react-native';
import { scaleSize } from '../../aux/dimensions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: scaleSize(6, true)
  },
  list:{
    width: '100%',
    height: '100%'
  },
  addPaymentContainer: {
    backgroundColor: '#0E78C2'
  }
});

export default styles;
