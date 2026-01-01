import { StyleSheet, View } from "react-native";
import { useTheme } from "../../utils/themeManager";
import Animated, {
  useAnimatedStyle,
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";

export const Loader = () => {
  const { theme } = useTheme();

  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 1800,
        easing: Easing.linear,
      }),
      -1
    );

    scale.value = withRepeat(
      withTiming(1.5, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Animated.View style={[styles.logo, animatedStyle]}>
        <Icon
          name="gear"
          size={20}
          color={theme.textPrimary}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    justifyContent: "center", 
    alignItems: "center",      
  },
});
