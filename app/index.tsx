import Dots from  '../ui/dots';
import React, { useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, useWindowDimensions, View } from "react-native";

const texts = [
  { text: 'I' },
  { text: 'love' },
  { text: 'you' },
  { text: '❤️' },
];

export default function Index() {
  const {width: windowWidth } = useWindowDimensions();

  const [activeDots, setActiveDots] = useState(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const onPressDot = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: windowWidth*index,
      y: 0,
      animated: true,
    });
  };
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const positionX = event.nativeEvent.contentOffset.x;
    setActiveDots(
      Math.round(positionX/windowWidth) + 1
    );
  };
  return (
    <View className="h-full  bg-gray-800">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        decelerationRate="fast"
        snapToInterval={windowWidth}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        snapToAlignment="center"
        className="snap-x snap-mandatory"
      >
        {texts.map((value, index) =>(
          <View
            key={index}
            className="bg-black snap-always snap-center w-screen h-screen flex items-center justify-center"
          >
            <Text className="text-white text-[150px]">
              {value.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View className="flex-row absolute bottom-0 w-full">
        <View className="flex flex-row justify-center w-full pb-10">
        <Dots
          dots={texts.length}
          active={activeDots}
          onPressDot={onPressDot}
          ui={{ bg: 'bg-blue-600'}}
        />
        </View>
      </View>
    </View>
  );
}

