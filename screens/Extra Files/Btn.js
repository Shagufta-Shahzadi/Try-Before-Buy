import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Btn({bgColor, btnLabel, textColor, Press}) {
  return (
    <TouchableOpacity
    onPress={Press}
      style={{
        backgroundColor: "rgb(226, 150, 37)",
        borderRadius: 10,
        borderRadiuscolour: "rgb(49, 33, 47)",
        alignItems: 'center',
        width: 150,
        paddingVertical: 5,
        marginVertical: 15,
        position: "relative",
        marginLeft:15,
        marginRight:5,
        marginTop: 30
      }}>
      <Text style={{color: "rgb(243, 239, 239)", fontSize: 18, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
