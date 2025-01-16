import { twMerge } from "tailwind-merge";
import { Pressable, View } from "react-native";
import { useMemo } from "react";
import clsx from "clsx";

interface DotsUi {
  dot?: string,
  dotWrap?: string,
  dotContainer?: string,
  bg?: string,
}

interface DotsProps {
  dots: number,
  active: number,
  onPressDot: (index: number) => void
  className?: string;
  ui?: DotsUi,
}

export default function Dots({
  dots,
  active,
  className,
  ui,
  onPressDot,
}: DotsProps) {
  const dotsArray = useMemo(() => [...Array(dots)], [dots]);
  return (
    <View className={className}>
      <View className={clsx("flex-row z-10", ui?.dotContainer)}>
        {dotsArray.map((_, index) =>(
          <Pressable
            key={index}
            className={clsx("p-3", ui?.dotWrap)}
            onPress={() => onPressDot(index)}
          >
            <View
              className={clsx(
                twMerge(
                  "size-3 dark:bg-white bg-black rounded-full",
                  "transition-[opacity] duration-150",
                  ui?.dot,
                ),
                { "opacity-50": index > active - 1},
              )}
            />
          </Pressable>
        ))}
      </View>
      <View
        className={twMerge(
          "bg-red-700 h-full rounded-3xl absolute",
          "transition-[width] duration-300",
          ui?.bg,
        )}
        style={{ width: `${(100 * active)/dots}%` }}
      />
    </View>
  );
}
