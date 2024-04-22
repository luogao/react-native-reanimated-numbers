import * as React from 'react';

import { StyleSheet, View, Button, Alert } from 'react-native';
import AnimatedNumber from 'react-native-reanimated-numbers';

export default function App() {
  const [animateToNumber, setAnimateToNumber] = React.useState(18888);

  return (
    <View style={styles.container}>
      <AnimatedNumber
        animateToNumber={animateToNumber}
        fontStyle={{
          fontSize: 30,
        }}
        onAnimationFinished={() => {
          Alert.alert('Animation finished');
        }}
      />

      <Button
        title="Animate"
        onPress={() => setAnimateToNumber(Math.floor(Math.random() * 10000))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
