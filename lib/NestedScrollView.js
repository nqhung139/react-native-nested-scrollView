import React, { Component } from "react";
import { ScrollView } from "react-native";

export default class CoordinatorLayout extends Component {
  render() {
    const { maxHeight, minHeight, style, ...props } = this.props;
    return (
      <ScrollView {...props} style={[style, { height: minHeight || 0 }]} />
    );
  }
}
