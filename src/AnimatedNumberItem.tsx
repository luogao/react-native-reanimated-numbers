import React, { useEffect } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import isEqual from 'lodash.isequal';
import Animated, {
  useSharedValue,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedNumberItemProps } from './types';

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const AnimatedNumberItem: React.FC<AnimatedNumberItemProps> = ({
  index,
  number,
  fontStyle,
  numberHeight,
  prevNumber,
  easing,
  animationDuration,
}) => {
  const animationValue = useSharedValue(
    typeof prevNumber !== 'number' ? 0 : -1 * (numberHeight * prevNumber)
  );

  useEffect(() => {
    if (typeof number === 'number') {
      runAnimation(number, numberHeight);
    }
    // eslint-disable-next-line
  }, [number, numberHeight, prevNumber]);

  const runAnimation = (_next: number, _numberHeight: number) => {
    animationValue.value = withTiming(-1 * (_numberHeight * _next), {
      duration:
        typeof animationDuration === 'number' ? animationDuration : 1300,
      easing: easing || Easing.elastic(1.2),
    });
  };

  const heightStyle = { height: numberHeight };
  const containerStyle: StyleProp<ViewStyle> = {
    ...heightStyle,
    overflow: 'hidden',
  };

  if (typeof number === 'string') {
    return (
      <Text key={index} style={[fontStyle, heightStyle]}>
        {number}
      </Text>
    );
  }

  return (
    <View key={index} style={containerStyle}>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: animationValue,
              },
            ],
          },
        ]}
      >
        {NUMBERS.map((number, i) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            key={i}
          >
            <Text
              style={[
                fontStyle,
                {
                  height: numberHeight,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  includeFontPadding: false,
                },
              ]}
            >
              {number}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default React.memo(AnimatedNumberItem, isEqual);
