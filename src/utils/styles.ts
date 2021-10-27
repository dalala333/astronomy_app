import { StyleSheet, Platform, StatusBar } from 'react-native';
export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  IOsSafeArea: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 36 : 0,
  },
});
