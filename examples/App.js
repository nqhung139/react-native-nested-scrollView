import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  CoordinatorLayout,
  ViewBehavior as FooterBehavior,
  NestedScrollView
} from "react-native-nested-scrollView";
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default class App extends Component {
  handleScroll = () => null;
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: "#ff9999",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Main Content</Text>
          </View>
        </ScrollView>

        <FooterBehavior
          maxHeight={700}
          minHeight={50}
          ref={sef => {
            if (sef) {
              this.handleScroll = sef.onScrollOfChild;
            }
          }}
        >
          <View
            style={{
              backgroundColor: "#9999ff",
              height: 60,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text>Main Behavior</Text>
          </View>
          <ScrollView onScroll={e => this.handleScroll(e)}>
            {data.map(value => (
              <View
                key={value}
                style={{
                  backgroundColor: "#99ff99",
                  height: 30,
                  marginTop: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>{value}</Text>
              </View>
            ))}
            {data.map(value => (
              <View
                key={value}
                style={{
                  backgroundColor: "#99ff99",
                  height: 30,
                  marginTop: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>{value}</Text>
              </View>
            ))}
            {data.map(value => (
              <View
                key={value}
                style={{
                  backgroundColor: "#99ff99",
                  height: 30,
                  marginTop: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>{value}</Text>
              </View>
            ))}
            {data.map(value => (
              <View
                key={value}
                style={{
                  backgroundColor: "#99ff99",
                  height: 30,
                  marginTop: 5,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text>{value}</Text>
              </View>
            ))}
          </ScrollView>
        </FooterBehavior>
      </View>
    );
  }
}
