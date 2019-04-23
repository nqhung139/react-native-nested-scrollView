import React, { Component } from "react";
import { View, PanResponder, Animated } from "react-native";

export default class ViewBehavior extends Component {
  constructor(props) {
    super(props);
    this.onScrollOfChild = this.onScrollOfChild.bind(this);
    this.position = new Animated.Value(props.minHeight || 0);
    this.onTop = false;
    this.childIsInitedState = true;
    this.parentResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => {
        return false;
      },
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        // return true;
        if (this.onTop) {
          return gestureState.dy > 6 && this.childIsInitedState;
          // return false;
        } else {
          return gestureState.dy < -6;
        }
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (evt, gestureState) => {
        this.startedPoint = gestureState.dy;
      },
      onPanResponderMove: (evt, gestureState) => {
        let newy = gestureState.dy;

        if (this.onTop) {
          this.position.setValue(props.maxHeight - newy);
        } else {
          this.position.setValue(props.minHeight - newy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.onTop) {
          if (gestureState.dy > 20) {
            this.snapToBottom(props.minHeight);
          } else {
            this.snaponTop();
          }
        } else {
          if (gestureState.dy < -20) {
            this.snaponTop();
          } else {
            this.snapToBottom(props.minHeight);
          }
        }
      }
    });
  }

  snaponTop = () => {
    Animated.timing(this.position, {
      toValue: this.props.maxHeight,
      duration: 300
    }).start(() => {});
    this.onTop = true;
  };

  snapToBottom = initialPosition => {
    Animated.timing(this.position, {
      toValue: initialPosition,
      duration: 150
    }).start(() => {});
    this.onTop = false;
  };

  onScrollOfChild(e) {
    if (e.nativeEvent.contentOffset.y < 6) {
      this.childIsInitedState = true;
    } else {
      this.childIsInitedState = false;
    }
  }

  render() {
    return (
      <Animated.View
        {...this.props}
        {...this.parentResponder.panHandlers}
        style={[this.props.style, { height: this.position }]}
      />
    );
  }
}
