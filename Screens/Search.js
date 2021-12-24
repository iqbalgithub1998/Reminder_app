import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  BackHandler,
  Alert,
} from "react-native";
import NoTask from "../components/NoTask";
import Todo from "../components/Todo";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
export default function Search({
  list,
  searchTxt,
  completed,
  showCompleted,
  subTaskComplete,
  ComplteTask,
  editText,
  clearSearchTxt,
  theme,
}) {
  const [searchResult, setSearchresult] = useState([]);
  useEffect(() => {
    let res = list.filter((obj) => {
      let task = obj.task.toLowerCase();
      console.log();
      if (task.indexOf(searchTxt.toLowerCase()) !== -1) {
        return true;
      } else {
        if (obj.isSubTask) {
          for (let j = 0; j < obj.subtask.length; j++) {
            let subtask = obj.subtask[j].sub_task.toLowerCase();
            if (subtask.indexOf(searchTxt.toLowerCase()) !== -1) {
              return true;
            }
          }
        }
      }
    });
    setSearchresult([...res]);

    const backAction = () => {
      clearSearchTxt();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [searchTxt]);

  const renderItem = ({ item }) => {
    if (item.done == false) {
      return (
        <Todo
          item={item}
          subItem={item.subtask}
          subtaskComp={(subitem) => subTaskComplete(subitem, item)}
          completeAll={() => ComplteTask(item)}
          editText={() => editText(item)}
          theme={theme}
        />
      );
    }
  };
  const renderdoneItem = ({ item }) => {
    if (item.done == true) {
      return (
        <Todo
          item={item}
          subItem={item.subtask}
          subtaskComp={(subitem) => subTaskComplete(subitem, item)}
          completeAll={() => ComplteTask(item)}
          theme={theme}
        />
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme ? theme.screen : "ccccd9" },
      ]}
    >
      {searchResult.length == 0 ? (
        <NoTask title="search not found" />
      ) : (
        <View>
          <View>
            <FlatList
              data={searchResult}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View>
            {completed != 0 ? (
              <View style={styles.completedHeader}>
                <AntDesign
                  name={showCompleted ? "down" : "up"}
                  size={15}
                  onPress={() => {
                    setShowCompleted(!showCompleted);
                  }}
                  color="#ccccd9"
                />
                <Text
                  style={[
                    styles.text,
                    { color: theme ? theme.black : "black" },
                  ]}
                >
                  Completed {completed}
                </Text>
              </View>
            ) : null}
            {showCompleted ? (
              <FlatList
                data={searchResult}
                renderItem={renderdoneItem}
                keyExtractor={(item) => item.id}
              />
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  completedHeader: {
    flexDirection: "row",
    margin: 15,
  },
  container: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});
