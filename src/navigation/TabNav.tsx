import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Icons } from 'components/Icons';
import * as Animatable from 'react-native-animatable';
import React, { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from 'screens/home/HomeScreen';
import Colors from 'utils/Colors';
import CategoryStack from './CategoryStack';

interface Props {}

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef: any = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5 },
        1: { scale: 1.5 },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5 },
        1: { scale: 1 },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.btnContainer}
    >
      <Animatable.View
        style={styles.btnContainer}
        ref={viewRef}
        duration={1000}
      >
        <Icon
          type={item.type}
          name={item.activeIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const TabArr = [
  {
    id: 1,
    route: 'Home',
    label: 'Home',
    type: Icons.Ionicons,
    activeIcon: 'home',
    inActiveIcon: 'home-outline',
    component: HomeScreen,
  },
  {
    id: 2,
    route: 'Category',
    label: 'Category',
    type: Icons.Ionicons,
    activeIcon: 'planet',
    inActiveIcon: 'planet-outline',
    component: CategoryStack,
  },
];

const TabNav = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 60,
          bottom: 10,
          right: 20,
          left: 20,
          borderRadius: 10,
          borderWidth: 0.25,
          ...styles.shadow,
        },
      }}
    >
      {TabArr.map((item, index) => (
        <Tab.Screen
          name={item.route}
          component={item.component}
          key={item.id}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <Icon
                type={item.type}
                name={focused ? item.activeIcon : item.inActiveIcon}
                color={color}
                style={{}}
              />
            ),
            tabBarButton: (props) => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '50%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 1,
    borderTopWidth: 1,
  },
});

export default TabNav;
