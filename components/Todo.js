import React, { useState, useEffect } from "react";
import {
  CheckBox,
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Swipeable from 'react-native-gesture-handler/Swipeable';
export default function Todo({
  item,
  subtaskComp,
  subItem,
  completeAll,
  editText,
  theme,
  renderRightAction
}) {
  const [isShow, setShowing] = useState(false);
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

  // icon rotation animation Start .................................
  const handleAnimation = (val) => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start(() => {
      rotateAnimation.setValue(0);
      setShowing(!isShow);
    });
  };
  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: isShow ? ["180deg", "0deg"] : ["0deg", "180deg"],
  });
  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };
  // icon rotation animation Stop .................................

  const renderItem = (subItem) => {
    return (
      <View
        style={[
          styles.subTask,
          { backgroundColor: theme ? theme.listcolor : "#FFFFFF" },
        ]}
      >
        <CheckBox
          tintColors={{ true: "#ccccd9", false: "black" }}
          value={subItem.item.done}
          onValueChange={() => subtaskComp(subItem.item)}
          style={styles.checkbox}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={
            subItem.item.done
              ? [styles.title1, { color: theme ? theme.lightgrey : "#ccccd9" }]
              : [styles.title2, { color: theme ? theme.black : "black" }]
          }
        >
          {subItem.item.sub_task.length > 28
            ? subItem.item.sub_task.substring(0, 28 - 3) + "..."
            : subItem.item.sub_task}
        </Text>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightAction}>
    <TouchableOpacity
      onPress={editText}
      style={[
        styles.cardcontainer,
        { backgroundColor: theme ? theme.listcolor : "#FFFFFF" },
      ]}
    >
      <View
        style={[
          styles.titleContainer,
          { backgroundColor: theme ? theme.listcolor : "#FFFFFF" },
        ]}
      >
        <View style={styles.checkTitle}>
          <CheckBox
            tintColors={{ true: "#ccccd9", false: "black" }}
            onValueChange={completeAll}
            value={item.done}
            style={styles.checkbox}
          />
          <View>
            <Text
              numberOfLines={1}
              style={
                item.done
                  ? [
                      styles.title1,
                      { color: theme ? theme.lightgrey : "#ccccd9" },
                    ]
                  : [styles.title2, { color: theme ? theme.black : "black" }]
              }
            >
              {item.task.length > 25
                ? item.task.substring(0, 25 - 3) + "..."
                : item.task}
            </Text>
            {item.time ? (
              <View style={{ flexDirection: "row" }}>
                <AntDesign
                  name="clockcircleo"
                  size={12}
                  color={item.done ? "#ccccd9" : "red"}
                />
                <Text style={item.done ? styles.time2 : styles.time}>
                  {item.time}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.icon}>
          {item.isSubTask ? (
            <Text style={{ margin: 5, color: "#ccccd9" }}>
              {item.complateSubTask}/{item.subtask.length}
            </Text>
          ) : null}
          {item.isSubTask ? (
            <TouchableOpacity
              onPress={() => {
                const val = isShow;
                handleAnimation(val);
              }}
            >
              <Animated.View style={animatedStyle}>
                <AntDesign name="downcircle" size={24} color="#ccccd9" />
              </Animated.View>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View>
        {isShow ? (
          <FlatList
            data={item.subtask}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={null}
          />
        ) : null}
      </View>
    </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    elevation: 3,
    margin: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 75,
  },
  cardcontainer: {
    marginTop: 10,
    marginLeft: "5%",

    minHeight: 75,
    width: "90%",
    borderRadius: 20,
    overflow: "hidden",
  },
  checkTitle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 15,
    flexDirection: "row",
  },
  rotateIcon: {
    transform: [{ rotate: "180deg" }],
  },
  subTask: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 15,
  },
  time: {
    marginLeft: 3,
    fontSize: 12,
    color: "red",
  },
  time2: {
    marginLeft: 3,
    fontSize: 12,
    color: "#ccccd9",
  },
  title1: {
    textDecorationLine: "line-through",
    color: "#ccccd9",
    fontSize: 16,
  },
  title2: {
    fontWeight: "700",
    fontSize: 16,
    color: "black",
  },
});
