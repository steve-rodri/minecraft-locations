import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, ViewProps } from "tamagui";

export const SafeAreaXView = (props: ViewProps) => {
  const { left, right } = useSafeAreaInsets();
  return (
    <View {...props} pl={left} pr={right}>
      {props.children}
    </View>
  );
};
