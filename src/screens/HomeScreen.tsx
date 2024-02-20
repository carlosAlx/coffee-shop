import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useStore } from "../store/store";
import { ProductType } from "../type/type";
import CoffeeData from "../data/CoffeeData";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from "../themes/theme";
import HeaderBar from "../components/HeaderBar";

const getCategoriesFromData = (data: ProductType[]) => {
  let temp: any = [];
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};
const getCoffeeList = (category: string, data: ProductType[]) => {
  if (category == "All") {
    return data;
  } else {
    let coffteeList = data.filter((item) => item.name == category);
  }
};

export default function HomeScreen() {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(undefined);

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrowView}
      >
        <HeaderBar />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  scrowView: {
    flexGrow: 1,
  },
});
