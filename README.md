# react-native-reanimated-numbers

react native library shows animation when numebrs change, powered by reanimated

## Installation

```sh
npm install react-native-reanimated-numbers


yarn add react-native-reanimated-numbers
```

## Usage

```tsx
import AnimatedNumber from 'react-native-reanimated-numbers';

// ...

const [animateToNumber, setAnimateToNumber] = React.useState(18888);

<AnimatedNumber
  animateToNumber={animateToNumber}
  fontStyle={{
    fontSize: 30,
  }}
  onAnimationFinished={() => {
    Alert.alert('Animation finished');
  }}
/>;

<Button
  title="Animate"
  onPress={() => setAnimateToNumber(Math.floor(Math.random() * 10000))}
/>;

```

## Props

| Prop Name          | Type                                   | Default Value | Description                                             |
|--------------------|----------------------------------------|---------------|---------------------------------------------------------|
| animateToNumber    | number                                 |               | 需要动画效果到达的数值。                                 |
| fontStyle          | StyleProp<TextStyle>                   | undefined     | 文本样式属性，可以是任何 Text 组件有效的 StyleProp。     |
| animationDuration  | number                                 | 1300          | 动画持续时间（毫秒）。                                   |
| easing             | EasingFunction \| EasingFunctionFactory| Easing.elastic(1.2)     | 控制动画节奏的缓动函数。                                 |
| onReady            | () => void                             | undefined     | 组件准备完毕时的回调函数。                               |
| emptyText          | string \| number                       | undefined     | 当没有内容时显示的文本或数值。                           |
| onAnimationFinished| () => void                             | undefined     | 动画完成后的回调函数。                                   |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
