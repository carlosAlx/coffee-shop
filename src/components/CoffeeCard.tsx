import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  SPACING,
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from "../themes/theme";
import LinearGradient from "react-native-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import BGIcon from "./BGIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

type Props = {
  id: string;
  index: number;
  type: string;
  roasted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
};

export default function CoffeeCard({
  id,
  index,
  type,
  roasted,
  imagelink_square,
  average_rating,
  name,
  buttonPressHandler,
  price,
  special_ingredient,
}: Props) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <ImageBackground
        source={imagelink_square}
        style={styles.cardImageBG}
        resizeMode="cover"
      >
        <View style={styles.cardRatingContainer}>
          <FontAwesome
            name={"star"}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.cardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
      <View style={styles.cardFooterRow}>
        <Text style={styles.cardPriceCurrency}>
          $ <Text style={styles.cardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{ ...price, quantity: 1 }],
            });
          }}
        >
          <BGIcon BGColor={COLORS.primaryOrangeHex}>
            <FontAwesome
              name="plus"
              color={COLORS.primaryWhiteHex}
              size={FONTSIZE.size_10}
            />
          </BGIcon>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: "hidden",
  },
  cardRatingContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: "absolute",
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  cardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  cardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.space_15,
  },
  cardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
  },
});
