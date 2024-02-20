import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useStore } from "../store/store";
import { ProductType } from "../type/type";
import CoffeeData from "../data/CoffeeData";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../themes/theme";
import HeaderBar from "../components/HeaderBar";
import { FontAwesome } from "@expo/vector-icons";
import CoffeeCard from "../components/CoffeeCard";

const getCategoriesFromData = (data: ProductType[]) => {
  let temp: any = {};
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
    return coffteeList;
  }
};

export default function HomeScreen({ navigation }: any) {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const ListRef: any = useRef<FlatList>();

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );
  const searchCoffee = (search: string) => {
    if (search != "") {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ),
      ]);
    }
  };
  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...CoffeeList]);
    setSearchText("");
  };

  const tabBarHeight = useBottomTabBarHeight();

  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: ProductType) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrowView}
      >
        {/* -- app header --*/}
        <HeaderBar />
        <Text style={styles.screenTitle}>
          Find the best{"\n"} coffee for you!
        </Text>

        {/* -- search input --*/}
        <View style={styles.inputContainerComponent}>
          <TouchableOpacity
            onPress={() => {
              searchCoffee(searchText);
            }}
          >
            <FontAwesome
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your coffee"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                resetSearchCoffee();
              }}
            >
              <FontAwesome
                style={styles.inputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* -- category --*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollViewStyle}
        >
          {categories.map((data, index) => (
            <View style={styles.categoryScrollViewContainer}>
              <TouchableOpacity
                key={index.toString()}
                style={styles.categoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({
                    index: index,
                    category: categories[index],
                  });
                  setSortedCoffee(
                    ...[getCoffeeList(categories[index], CoffeeList)]
                  );
                }}
              >
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex.index == index && {
                      color: COLORS.primaryOrangeHex,
                    },
                  ]}
                >
                  {data}
                </Text>
                {categoryIndex.index == index && (
                  <View style={styles.activeCategory}></View>
                )}
              </TouchableOpacity>
            </View>
          ))}
          </ScrollView>
          {/*-- coffee flatlist --*/}
          <FlatList
            ref={ListRef}
            horizontal
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Text style={styles.categoryText}>No Coffee Available</Text>
              </View>
            }
            showsHorizontalScrollIndicator={false}
            data={sortedCoffee}
            contentContainerStyle={styles.flatListContainer}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                 <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
                </TouchableOpacity>
              );
            }}
          />
          <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>

          {/*-- bean flatlist --*/}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={BeanList}
            contentContainerStyle={[
              styles.flatListContainer,
              { marginBottom: tabBarHeight },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Details", {
                      index: item.index,
                      id: item.id,
                      type: item.type,
                    });
                  }}
                >
                  <CoffeeCard
                    id={item.id}
                    index={item.index}
                    type={item.type}
                    roasted={item.roasted}
                    imagelink_square={item.imagelink_square}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    average_rating={item.average_rating}
                    price={item.prices[2]}
                    buttonPressHandler={CoffeCardAddToCart}
                  />
                </TouchableOpacity>
              );
            }}
          /> 
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrowView: {
    flexGrow: 1,
  },
  screenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainerComponent: {
    flexDirection: "row",
    columnGap: SPACING.space_10,
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
    paddingHorizontal: SPACING.space_15,
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollViewItem: {
    alignItems: "center",
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  emptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_36 * 3.6,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});
