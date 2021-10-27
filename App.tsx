import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import LoadingScreen from 'components/LoadingScreen';
// import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Box, extendTheme, NativeBaseProvider } from 'native-base';
import Root from 'navigation/Root';
import TabNav from 'navigation/TabNav';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'redux/stores';
import GlobalStyles from 'utils/styles';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: 'rgb(255, 45, 85)',
  },
};

const theme = extendTheme({
  components: {
    Text: {},
    /*
      Element:{
        baseStyle:{},
        defaultProps:{},
        variant:{},
        size:{},
      }
    */
  },
});

export default function App() {
  return (
    <SafeAreaProvider
      style={[
        styles.root,
        GlobalStyles.AndroidSafeArea,
        GlobalStyles.IOsSafeArea,
      ]}
    >
      <Provider store={store}>
        <NativeBaseProvider theme={theme}>
          <NavigationContainer theme={MyTheme}>
            <StatusBar
              animated={true}
              translucent
              backgroundColor="transparent"
            />
            <TabNav />
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
