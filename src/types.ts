import type { StyleProp, TextStyle } from 'react-native';
import type {
  EasingFunctionFactory,
  EasingFunction,
} from 'react-native-reanimated';

export type AnimatedNumberProps = {
  animateToNumber: number;
  fontStyle?: StyleProp<TextStyle>;
  animationDuration?: number;
  easing?: EasingFunction | EasingFunctionFactory;
  onReady?: () => void;
  emptyText?: string | number;
  onAnimationFinished?: () => void;
};

export type AnimatedNumberItemProps = {
  fontStyle: StyleProp<TextStyle>;
  animationDuration: number;
  easing: EasingFunction | EasingFunctionFactory;
  index: number;
  numberHeight: number;
  number: string | number;
  prevNumber?: string | number;
};
