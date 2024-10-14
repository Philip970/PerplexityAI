import { Dimensions, StyleSheet, Image, View, Text } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { Item } from "@/mockData";

type Props = {
  data: Item[];
};

type AnimatedCardProps = {
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
};

const { height } = Dimensions.get("screen");

const _spacing = 4;
const _itemSize = height * 0.72;
const _itemFullSize = _itemSize + _spacing * 2;

const AnimatedCard = ({ item, index, scrollY }: AnimatedCardProps) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.92, 1, 0.92]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          height: _itemSize,
          padding: _spacing * 2,
          borderRadius: 8,
          gap: _spacing,
        },
        rStyle,
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            borderRadius: 12,
          },
        ]}
        blurRadius={50}
      />
      <Image
        source={{ uri: item.image }}
        style={{ flex: 1, height: _itemSize * 0.4 }}
      />
      <View style={{ gap: _spacing }}>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "white" }}>
          {item.title}
        </Text>
        <Text numberOfLines={3} style={{ color: "#ddd" }}>
          {item.description}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: _spacing,
        }}
      >
        <Image
          source={{ uri: item.author.avatar }}
          style={{
            width: 24,
            aspectRatio: 1,
            borderRadius: 12,
          }}
        />
        <Text style={{ fontSize: 12, color: "#ddd" }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
};

const VerticalList = ({ data }: Props) => {
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y / _itemFullSize;
  });
  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        gap: _spacing * 2,
        paddingVertical: (height - _itemFullSize) / 2,
      }}
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"}
      renderItem={({ item, index }) => (
        <AnimatedCard item={item} index={index} scrollY={scrollY} />
      )}
      onScroll={onScroll}
      scrollEventThrottle={16}
    />
  );
};

export default VerticalList;

const styles = StyleSheet.create({});
