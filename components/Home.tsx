import { View, Text, Dimensions, ViewStyle, Image } from "react-native";
import React from "react";
import Animated, { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function HomeScreen({ navigation }) {
  type TAnimationStyle = (value: number) => Animated.AnimateStyle<ViewStyle>;
  const width = Dimensions.get("window").width;
  const itemSize = width / 4;
  const centerOffset = width / 2 - itemSize / 2;

  const CAROUSEL_DATA = [
    {
      title: "Hurdles",
      illustration: require("./images/hurdles.png"),
    },
    {
      title: "Sprint",
      illustration: require("./images/sprint.png"),
    },
    {
      title: "Pole_vault",
      illustration: require("./images/polevault.png"),
    },
    {
      title: "Long jump",
      illustration: require("./images/longjump.png"),
    },
    {
      title: "High jump",
      illustration: require("./images/highjump.png"),
    },
  ];

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2, 3],
        [-30, -15, 0, 0, 0, 15, 30]
      );

      const translateX =
        interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize]) +
        centerOffset -
        itemGap;

      const translateY = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [20, 25, 30, 25, 20]
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.6, 0.6, 1.1, 0.6, 0.6]
      );

      return {
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
          { scale },
        ],
      };
    },
    [centerOffset]
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Carousel
        width={itemSize}
        height={itemSize}
        style={{
          width: width,
          height: width / 2,
          backgroundColor: "transparent",
        }}
        loop
        data={CAROUSEL_DATA}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            key={item.title}
            onPress={() => {
              navigation.navigate("Test", { title: item.title });
            }}
            containerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                backgroundColor: "transparent",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={item.illustration}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: itemSize / 2,
                }}
              />
              <Text
                style={{
                  color: "#ffffff",
                  opacity: 0.75,
                  fontWeight: "600",
                  fontSize: 20,
                }}
              >
                {item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        customAnimation={animationStyle}
      />
    </View>
  );
}

export default HomeScreen;
