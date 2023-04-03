import { View, Text, Dimensions, ViewStyle, Image } from 'react-native'
import React from 'react'
import Animated, { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


function HomeScreen(){
  type TAnimationStyle = (value: number) => Animated.AnimateStyle<ViewStyle>;
  const width = Dimensions.get('window').width;
  const itemSize = width / 4;
  const centerOffset = width / 2 - itemSize / 2;

  const CAROUSEL_DATA = [
    {
      title: 'Hurdles',
      illustration: require('./images/sprint1.png'),
    },
    {
      title: 'Sprints',
      illustration: require('./images/sprint1.png'),
    },
    {
      title: 'Pole vault',
      illustration: require('./images/sprint1.png'),
    },
    {
      title: '4',
      illustration: require('./images/sprint1.png'),
    },
    {
      title: '5',
      illustration: require('./images/sprint1.png'),
    }
  ];
  
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
        [20, 25, 30, 25, 20],
      );

      const scale = interpolate(
        value,
        [-1, -0.5, 0, 0.5, 1],
        [0.6, 0.6, 1.2, 0.6, 0.6]
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
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
    <Carousel
      width={itemSize}
      height={itemSize}
      style={{
        width: width,
        height: width / 2,
        backgroundColor: 'transparent',
      }}
      
      loop
      data={CAROUSEL_DATA}
      renderItem={({ item }) => (
        <TouchableWithoutFeedback
          key={item.title}
          onPress={() => {
            console.log(item.title);
          }}
          containerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              backgroundColor: '#383838',
              flex: 1,
              borderRadius: itemSize / 2,
              justifyContent: "center",
              overflow: "hidden",
              alignItems: "center",
            }}
          >
            <Image source={item.illustration} 
              style = {{
                position: "absolute",
                width: "100%",
                height: "100%"
              }}
            />
            <Text
              style={{
                color: "#E71D35",
                fontWeight: "600",
                fontSize: 30,
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

export default HomeScreen
