import { View, Text, Dimensions, ViewStyle } from 'react-native'
import React from 'react'
import Animated, { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


function HomeScreen(){
  type TAnimationStyle = (value: number) => Animated.AnimateStyle<ViewStyle>;
  const width = Dimensions.get('window').width;
  const itemSize = 80;
  const centerOffset = width / 2 - itemSize / 2;

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";

      const itemGap = interpolate(
        value,
        [-3, -2, -1, 0, 1, 2, 3],
        [-30, -15, 0, 0, 0, 15, 30],
      );

      const translateX
                = interpolate(value, [-1, 0, 1], [-itemSize, 0, itemSize])
                + centerOffset
                - itemGap;

      const translateY = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [25, 35, 40, 35, 25],
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.75, 0.8, 1.2, 0.8, 0.75]
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
    [centerOffset],
  );

return (
  <View style={{ flex: 1 }}>
    <Carousel
      width={itemSize}
      height={itemSize}
      style={{
        width: width,
        height: width / 2,
        backgroundColor: 'transparent',
      }}
      loop
      data={[...new Array(5).keys()]}
      renderItem={({ index }) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            console.log(index);
          }}
          containerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              backgroundColor: "black",
              flex: 1,
              borderRadius: 50,
              justifyContent: "center",
              overflow: "hidden",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 30,
              }}
            >
              {index}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      customAnimation={animationStyle}
    />
  </View>
);
}

export default HomeScreen
