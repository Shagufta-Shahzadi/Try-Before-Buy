import * as React from "react";
import {Image, StyleSheet, View} from "react-native";

const CameraWithCategorie = () => {
  	
  	return (
    		<View style={styles.cameraWithCategorie}>
      			<Image style={[styles.istockphoto1277543253612x612Icon, styles.groupChildPosition]} resizeMode="cover" source="istockphoto-1277543253-612x612.png" />
      			<Image style={styles.cameraWithCategorieChild} resizeMode="cover" source="Group 225.png" />
      			<View style={[styles.groupParent, styles.groupLayout]}>
        				<Image style={[styles.groupChild, styles.groupLayout]} resizeMode="cover" source="Group 108.png" />
        				<Image style={[styles.groupItem, styles.groupLayout]} resizeMode="cover" source="Group 112.png" />
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	groupChildPosition: {
    		left: 0,
    		top: 0
  	},
  	groupLayout: {
    		height: 52,
    		position: "absolute"
  	},
  	istockphoto1277543253612x612Icon: {
    		width: 412,
    		height: 989,
    		position: "absolute"
  	},
  	cameraWithCategorieChild: {
    		top: 13,
    		left: 287,
    		width: 106,
    		height: 741,
    		position: "absolute"
  	},
  	groupChild: {
    		width: 109,
    		left: 0,
    		top: 0
  	},
  	groupItem: {
    		left: 124,
    		width: 50,
    		top: 0,
    		height: 52
  	},
  	groupParent: {
    		top: 787,
    		left: 210,
    		width: 174
  	},
  	cameraWithCategorie: {
    		backgroundColor: "#fff",
    		flex: 1,
    		width: "100%",
    		height: 852,
    		overflow: "hidden"
  	}
});

export default CameraWithCategorie;
