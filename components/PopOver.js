import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Popover from "react-native-popover-view";
const PopOver = ({ value, valueArray, updateValue }) => {
  const [showPopover, setShowPopover] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowPopover(false), 2000);
  }, []);
  return (
    <Popover
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
      from={
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <Text style={{ color: "#979996", fontSize: 19 }}>{value}</Text>
        </TouchableOpacity>
      }
    >
      {valueArray.map((v, index) => (
        <TouchableOpacity
          onPress={() => {
            setShowPopover(false);
            updateValue(v);
          }}
          style={{ backgroundColor: value === v ? "#DADADA" : null }}
          key={index}
        >
          <Text style={styles.text}>{v}</Text>
        </TouchableOpacity>
      ))}
    </Popover>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#979996",
    fontSize: 20,
    padding: 10,
  },
});

export default PopOver;
