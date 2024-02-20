import { StyleSheet, View } from "react-native";
import React from "react";
import { BORDERRADIUS, SPACING } from "../themes/theme";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  children: React.ReactNode;
  BGColor: string;
};

const BGIcon = ({ children, BGColor}: Props) => {
  const Icon = FontAwesome.name;
  return (
    <View style={[styles.iconBG, { backgroundColor: BGColor }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  iconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDERRADIUS.radius_8,
  },
});

export default BGIcon;
