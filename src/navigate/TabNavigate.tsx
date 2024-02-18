import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Cartscreen from "../screens/Cartscreen";
import FavoritesScrenn from "../screens/FavoritesScrenn";
import OrderHistiyScreen from "../screens/OrderHistiyScreen";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS } from "../themes/theme";
import { BlurView } from "@react-native-community/blur";

const Tab = createBottomTabNavigator();

export default function TabNavigate() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView
            blurAmount={15}
            overlayColor=""
            style={styles.BlurViewStyles}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="home"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={size}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={Cartscreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="shopping-cart"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={size}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Favorite"
        component={FavoritesScrenn}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="star"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={size}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="History"
        component={OrderHistiyScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather
              name="inbox"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={size}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
  },
  BlurViewStyles: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  labBarStyle: {
    color: COLORS.primaryLightGreyHex,
  },
});
