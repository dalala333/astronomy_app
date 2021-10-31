import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
// import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Box, extendTheme, NativeBaseProvider } from 'native-base';
import TabNav from 'navigation/TabNav';
import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from 'redux/stores';
import GlobalStyles from 'utils/styles';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
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
            {Platform.OS === 'android' ? (
              <StatusBar
                animated={true}
                translucent
                backgroundColor="transparent"
              />
            ) : (
              <StatusBar
                animated={true}
                translucent
                backgroundColor="#fff"
                barStyle="dark-content"
              />
            )}
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
