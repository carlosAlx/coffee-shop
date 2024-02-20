import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Cartscreen from "../screens/Cartscreen";
import FavoritesScrenn from "../screens/FavoritesScrenn";
import OrderHistiyScreen from "../screens/OrderHistiyScreen";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../themes/theme";
import { BlurView } from "@react-native-community/blur";

const Tab = createBottomTabNavigator();

export default function TabNavigate() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView
            blurAmount={1}
            overlayColor=""
            style={styles.blurViewStyles}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
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
            <FontAwesome
              name="cart-plus"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
              size={30}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Favorite"
        component={FavoritesScrenn}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome
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
            <FontAwesome
              name="history"
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
    height: 80,
    position: "absolute",
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
  },
  blurViewStyles: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
