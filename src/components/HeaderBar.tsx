import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../themes/theme";
import GradientBGIcon from "./GradientBGIcon";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  title?: string;
};

export default function HeaderBar({ title }: Props) {
  return (
    <View style={styles.headerContainer}>
      <GradientBGIcon>
        <FontAwesome
          name="bars"
          color={COLORS.primaryLightGreyHex}
          size={FONTSIZE.size_16}
        />
      </GradientBGIcon>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
