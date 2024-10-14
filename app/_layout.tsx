import { View } from "react-native";

import VerticalList from "@/components/VerticalList";
import mockData from "@/mockData";

const RootLayout = () => {
  return (
    <View
      style={{
        backgroundColor: "#1d1d1d",
      }}
    >
      <VerticalList data={mockData} />
    </View>
  );
};

export default RootLayout;
