import React, { Component } from "react";
import { ScrollView } from "react-native";

export default class CoordinatorLayout extends Component {
  render() {
    return <ScrollView {...this.props} />;
  }
}
