import Dots from  '../ui/dots';
import React, { useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, useWindowDimensions, View } from "react-native";

export default function Index() {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const [dots] = useState(4);

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
        onScroll={handleScroll}
        scrollEventThrottle={400}
        snapToAlignment="center"
        className="snap-x snap-mandatory"
      >
        {[...Array(dots)].map((_, index) =>(
          <View
            key={index}
            className="bg-black snap-always snap-center"
            style={{
              opacity: index * 0.1,
              width: windowWidth,
              height: windowHeight,
            }}
          />
        ))}
      </ScrollView>
      <View className="flex-row m-10 absolute">
        <Dots
          dots={dots}
          active={activeDots}
          onPressDot={onPressDot}
          ui={{ bg: 'bg-blue-600'}}
        />
      </View>
    </View>
  );
}

