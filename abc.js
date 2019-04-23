/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  PanResponder,
  Animated,
  ScrollView
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);

    const { height, width } = Dimensions.get("window");

    const initialPosition = { x: 0, y: height - 70 };
    const position = new Animated.ValueXY(initialPosition);

    const parentResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        return false;
      },
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        if (this.state.toTop) {
          return gestureState.dy > 6;
        } else {
          return gestureState.dy < -6;
        }
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        let newy = gestureState.dy;
        if (this.state.toTop && newy < 0) return;
        if (this.state.toTop) {
          position.setValue({ x: 0, y: newy });
        } else {
          position.setValue({ x: 0, y: initialPosition.y + newy });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.state.toTop) {
          if (gestureState.dy > 50) {
            this.snapToBottom(initialPosition);
          } else {
            this.snapToTop();
          }
        } else {
          if (gestureState.dy < -90) {
            this.snapToTop();
          } else {
            this.snapToBottom(initialPosition);
          }
        }
      }
    });

    this.offset = 0;
    this.parentResponder = parentResponder;
    this.state = { position, toTop: false };
  }

  snapToTop = () => {
    Animated.timing(this.state.position, {
      toValue: { x: 0, y: 0 },
      duration: 300
    }).start(() => {});
    this.setState({ toTop: true });
  };

  snapToBottom = initialPosition => {
    Animated.timing(this.state.position, {
      toValue: initialPosition,
      duration: 150
    }).start(() => {});
    this.setState({ toTop: false });
  };

  hasReachedTop({ layoutMeasurement, contentOffset, contentSize }) {
    return contentOffset.y == 0;
  }

  render() {
    const { height } = Dimensions.get("window");

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Animated.View
          style={[
            styles.draggable,
            { height },
            this.state.position.getLayout()
          ]}
          {...this.parentResponder.panHandlers}
        >
          <Text style={styles.dragHandle}>=</Text>
          <ScrollView style={styles.scroll}>
            <Text style={{ fontSize: 44 }}>Lorem Ipsum</Text>
            <Text style={{ fontSize: 44 }}>dolor sit amet</Text>
            <Text style={{ fontSize: 44 }}>consectetur adipiscing elit.</Text>
            <Text style={{ fontSize: 44 }}>In ut ullamcorper leo.</Text>
            <Text style={{ fontSize: 44 }}>Sed sed hendrerit nulla,</Text>
            <Text style={{ fontSize: 44 }}>sed ullamcorper nisi.</Text>
            <Text style={{ fontSize: 44 }}>Mauris nec eros luctus</Text>
            <Text style={{ fontSize: 44 }}>leo vulputate ullamcorper</Text>
            <Text style={{ fontSize: 44 }}>et commodo nulla.</Text>
            <Text style={{ fontSize: 44 }}>Nullam id turpis vitae</Text>
            <Text style={{ fontSize: 44 }}>risus aliquet dignissim</Text>
            <Text style={{ fontSize: 44 }}>at eget quam.</Text>
            <Text style={{ fontSize: 44 }}>Nulla facilisi.</Text>
            <Text style={{ fontSize: 44 }}>Vivamus luctus lacus</Text>
            <Text style={{ fontSize: 44 }}>eu efficitur mattis</Text>
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  draggable: {
    position: "absolute",
    right: 0,
    backgroundColor: "skyblue",
    alignItems: "center"
  },
  dragHandle: {
    fontSize: 22,
    color: "#707070",
    height: 60
  },
  scroll: {
    paddingLeft: 10,
    paddingRight: 10
  }
});
