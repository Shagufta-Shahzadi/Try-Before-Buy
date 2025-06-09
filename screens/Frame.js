import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const Splash3 = () => {
  return (
    <View style={styles.splash3}>
      <View style={[styles.view, styles.viewPosition]}>
        <View style={[styles.view1, styles.viewPosition]}>
          <Image
            style={styles.viewPosition}
            contentFit="cover"
            source={require("../assets/11.png")}
          />
        </View>
        <View style={[styles.inner, styles.innerLayout]}>
          <View style={[styles.helloWrapper, styles.innerLayout]}>
            <Text style={styles.hello}>{`Hello `}</Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.categoryIcon}
        contentFit="cover"
        source={require("../assets/category1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewPosition: {
    width: 412,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
    height: 917,
  },
  innerLayout: {
    height: 54,
    width: 1,
    position: "absolute",
  },
  view1: {
    backgroundColor: Color.colorGray_100,
  },
  hello: {
    fontSize: FontSize.size_17xl,
    fontWeight: "700",
    fontFamily: FontFamily.poppinsBold,
    color: Color.schemesOnPrimary,
    textAlign: "center",
    left: 0,
    top: 0,
    position: "absolute",
  },
  helloWrapper: {
    top: -110,
    left: 0,
    overflow: "hidden",
  },
  inner: {
    top: 545,
    left: 206,
  },
  view: {
    backgroundColor: Color.schemesOnPrimary,
    width: 412,
  },
  categoryIcon: {
    marginTop: -17.5,
    marginLeft: -18,
    top: "50%",
    left: "50%",
    width: 36,
    height: 36,
    position: "absolute",
  },
  splash3: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    height: 917,
    backgroundColor: Color.schemesOnPrimary,
  },
});

export default Splash3;
