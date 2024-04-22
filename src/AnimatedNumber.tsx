import React, { useCallback } from 'react';
import { Text, View, LayoutChangeEvent } from 'react-native';
import isEqual from 'lodash.isequal';
import {
  Easing,
  withTiming,
  runOnJS,
  useSharedValue,
} from 'react-native-reanimated';
import AnimatedNumberItem from './AnimatedNumberItem';
import { AnimatedNumberProps } from './types';

const usePrevious = (value: number) => {
  const ref = React.useRef<number>();
  React.useEffect(() => {
    ref.current = value;
  });

  if (typeof ref.current === 'undefined') {
    return value;
  }

  return ref.current;
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  animateToNumber,
  fontStyle,
  animationDuration,
  easing,
  onReady,
  emptyText,
  onAnimationFinished,
}) => {
  const prevNumber = usePrevious(animateToNumber);
  const animateToNumberString = String(Math.abs(animateToNumber));
  const prevNumberString = String(Math.abs(prevNumber));

  // 把数字拆成数组
  const animateToNumbersArr = Array.from(animateToNumberString, (s) =>
    isNaN(Number(s)) ? s : Number(s)
  );
  const prevNumberersArr = Array.from(prevNumberString, (s) =>
    isNaN(Number(s)) ? s : Number(s)
  );

  const [numberHeight, setNumberHeight] = React.useState(0);
  const animationEndValue = useSharedValue(0);

  const setTextLayout = useCallback(
    (e: LayoutChangeEvent) => {
      typeof onReady === 'function' && onReady();
      setNumberHeight(e.nativeEvent.layout.height);
    },

    [onReady]
  );

  const onAnimationEnd = () => {
    typeof onAnimationFinished === 'function' && onAnimationFinished();
  };

  const runAllAnimation = async () => {
    animationEndValue.value = withTiming(
      1,
      {
        duration: animationDuration || 1300,
        easing: easing || Easing.elastic(1.2),
      },
      () => {
        runOnJS(onAnimationEnd)();
        animationEndValue.value = 0;
      }
    );
  };

  React.useEffect(() => {
    if (numberHeight === 0) return;
    if (prevNumber !== animateToNumber) {
      runAllAnimation();
    }
    // eslint-disable-next-line
  }, [animateToNumber, numberHeight, prevNumber]);

  return (
    <>
      {numberHeight !== 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* 负号 */}
          {animateToNumber < 0 && (
            <Text style={[fontStyle, { height: numberHeight }]}>{'-'}</Text>
          )}
          {animateToNumbersArr.map((n, index) => {
            return (
              <AnimatedNumberItem
                key={index}
                index={index}
                number={n}
                prevNumber={prevNumberersArr[index]}
                numberHeight={numberHeight}
                animationDuration={animationDuration || 1300}
                easing={easing || Easing.elastic(1.2)}
                fontStyle={fontStyle}
              />
            );
          })}
        </View>
      ) : (
        <Text style={[fontStyle]}>
          {typeof emptyText === 'undefined' ? 0 : emptyText}
        </Text>
      )}
      <Text
        style={[
          fontStyle,
          {
            position: 'absolute',
            top: -99999,
          },
        ]}
        onLayout={setTextLayout}
      >
        {0}
      </Text>
    </>
  );
};

export default React.memo(AnimatedNumber, isEqual);
