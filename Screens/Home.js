import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Keyboard,
  ScrollView,
  LogBox,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Todo from "../components/Todo";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { BottomModal } from "../components/BottomModal";
import DateTimePicker from "../components/DateTimePicker";
import NoTask from "../components/NoTask";
import Header from "../components/Header";
import Search from "./Search";
import ThemeContext from "../config/context";
import ListItemDeleteAction from "../components/ListItemDeleteAction";

export default function Home({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [showCompleted, setShowCompleted] = useState(true);
  const [newTask, setNewTask] = useState({
    id: "",
    task: "",
    done: false,
    isSubTask: false,
    complateSubTask: 0,
  });
  const [isModal, setModal] = useState(false);
  const [showData, setShowDate] = useState(false);
  const [dateMode, setDateMode] = useState("date");
  const [date, setDate] = useState(new Date());
  const [isEditing, setEditing] = useState(false);
  const [searchTxt, SetSearchTxt] = useState("");

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    getData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@do_reminder");
      if (jsonValue != null) {
        let localData = JSON.parse(jsonValue);

        setCompleted(parseInt(localData.completed));
        setData([...localData.newData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === "ios");
    setDate(currentDate);
    if (dateMode === "date") {
      setDateMode("time");
      setShowDate(true);
    }
    if (dateMode === "time") {
      const month = currentDate.getMonth();
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      const hour = currentDate.getHours();
      const minute = currentDate.getMinutes();
      const resDate = `${day}/${month + 1}/${year}-${hour}:${minute}`;
      const data = { ...newTask, time: resDate };
      setNewTask({ ...data });
      setDateMode("date");
      setModal(true);
    }
  };

  const openTimePicker = () => {
    setModal(false);
    setShowDate(true);
  };

  const clickHandler = () => {
    if (newTask.id.length == 0) {
      const nt = {
        id: (data.length + 1).toString(),
        task: "",
        done: false,
        isSubTask: false,
        complateSubTask: 0,
      };
      setNewTask({ ...nt });
    }
    setModal(true);
  };

  const addNewTask = async () => {
    let taskCompleted = completed;
    const nt = { ...newTask };
    let newData = [];
    if (data.length != 0) {
      newData = [...data];
    }
    if (nt.isSubTask === true) {
      const res = nt.subtask.filter((t) => t.sub_task.length > 0);
      nt.subtask = [...res];
    }
    if (isEditing == true) {
      const index = newData.findIndex((obj) => obj.id === nt.id);
      newData[index] = { ...nt };
      setEditing(false);
    } else {
      newData.push(nt);
    }
    setNewTask({
      id: "",
      task: "",
      done: false,
      isSubTask: false,
      complateSubTask: 0,
    });
    setData(newData);
    setModal(false);
    saveDataToLocalStorage(newData, taskCompleted);
  };

  const saveDataToLocalStorage = async (newData, taskCompleted) => {
    try {
      const jsonValue = JSON.stringify({
        completed: taskCompleted,
        newData: [...newData],
      });
      await AsyncStorage.setItem("@do_reminder", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const ComplteTask = (item) => {
    let taskCompleted = completed;
    if (item.done == false) {
      if (item.isSubTask == true) {
        item.subtask.map((i) => {
          i.done = true;
        });
        item.complateSubTask = item.subtask.length;
      }
      item.done = true;
      taskCompleted += 1;
      setCompleted(completed + 1);
    } else {
      if (item.isSubTask == true) {
        item.subtask.map((i) => {
          i.done = false;
        });
      }
      item.complateSubTask = 0;
      item.done = false;
      taskCompleted -= 1;
      setCompleted(completed - 1);
    }

    const newData = [];
    newData.push(item);
    const res = data.map((obj) => newData.find((o) => o.id === obj.id) || obj);
    setData(res);
    saveDataToLocalStorage(res, taskCompleted);
  };
  // subTask check box click function ............
  const subTaskComplete = (subitem, item) => {
    let taskCompleted = completed;
    const res = item.subtask.findIndex((o) => o.id === subitem.id);
    if (subitem.done == false) {
      item.subtask[res].done = true;
      item.complateSubTask += 1;
      if (item.complateSubTask == item.subtask.length) {
        item.done = true;
        taskCompleted += 1;
        setCompleted(completed + 1);
      }
    } else {
      item.subtask[res].done = false;
      item.complateSubTask -= 1;

      if (item.done == true && item.complateSubTask != item.subtask.length) {
        item.done = false;
        taskCompleted -= 1;
        setCompleted(completed - 1);
      }
    }
    const newData = [];
    newData.push(item);
    const changeData = data.map(
      (obj) => newData.find((o) => o.id === obj.id) || obj
    );
    setData(changeData);
    saveDataToLocalStorage(changeData, taskCompleted);
  };
  //udate newTask ...........
  const updateText = (txt) => {
    const nt = { ...newTask };
    nt.task = txt;
    setNewTask({ ...nt });
  };

  const updatesubText = (index, txt) => {
    const nt = { ...newTask };
    nt.subtask[index].sub_task = txt;
    setNewTask({ ...nt });
  };
  // enter pressed add new sub task in newTask .........`
  const handleKeyDown = (e) => {
    const nt = { ...newTask };
    if (nt.isSubTask === false) {
      if (nt.task.length > 0) {
        const newSubtask = {
          id: nt.id + "-1",
          sub_task: "",
          done: false,
        };
        nt.isSubTask = true;
        const subtask = [];
        subtask.push(newSubtask);
        const finalobj = { ...nt, subtask };
        setNewTask({ ...finalobj });
      }
    } else {
      if (nt.subtask[nt.subtask.length - 1].sub_task.length > 0) {
        const newSubtask = {
          id: `${nt.id}- ${nt.subtask.length + 1}`,
          sub_task: "",
          done: false,
        };
        nt.subtask.push(newSubtask);
        setNewTask({ ...nt });
      }
    }
  };

  const ClearKeyPress = (index) => {
    const nt = { ...newTask };
    if (nt.subtask[index].sub_task.length == 0) {
      if (index == 0) {
        delete nt.subtask;
        nt.isSubTask = false;

        setNewTask({ ...nt });
      } else {
        let nArray = [...nt.subtask];
        nArray.splice(index, 1);
        nt.subtask = [...nArray];
        setNewTask({ ...nt });
      }
    }
  };

  const gotoSetting = () => {
    navigation.navigate("Setting");
  };
  const onSearch = (txt) => {
    SetSearchTxt(txt);
  };

  const editText = (item) => {
    setEditing(true);
    setModal(true);
    setNewTask({ ...item });
  };

  const closeModal = () => {
    if (isEditing === true) {
      setNewTask({
        id: "",
        task: "",
        done: false,
        isSubTask: false,
        complateSubTask: 0,
      });
      setEditing(false);
    }
    setModal(false);
  };

  const deletePress = (index)=>{
    let taskCompleted = completed;
    const dataList = [...data];
    const newData = {...dataList[index]};
    dataList.splice(index, 1);
    setData([...dataList]);
    if(newData.done == true){
      taskCompleted -=1;
      setCompleted(taskCompleted);
    }
    saveDataToLocalStorage(dataList, taskCompleted);
  }

  const renderItem = ({ item,index }) => {
    if (item.done == false) {
      return (
        <Todo
          item={item}
          subItem={item.subtask}
          subtaskComp={(subitem) => subTaskComplete(subitem, item)}
          completeAll={() => ComplteTask(item)}
          editText={() => editText(item)}
          theme={theme}
          renderRightAction={()=><ListItemDeleteAction deletePress={()=>deletePress(index)} />}
        />
      );
    }
  };
  const renderdoneItem = ({ item,index }) => {
    if (item.done == true) {
      return (
        <Todo
          item={item}
          subItem={item.subtask}
          subtaskComp={(subitem) => subTaskComplete(subitem, item)}
          completeAll={() => ComplteTask(item)}
          theme={theme}
          renderRightAction={()=><ListItemDeleteAction deletePress={()=>deletePress(index)} />}
        />
      );
    }
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: theme ? theme.screen : "#F7F7F7" },
        ]}
      >
        <StatusBar
          animated={true}
          barStyle={theme ? theme.status : "dark-content"}
          backgroundColor={theme ? theme.statusbar : "white"}
        />
        <Header
          gotoSetting={gotoSetting}
          onSearch={onSearch}
          searchText={searchTxt}
          theme={theme}
        />
        {searchTxt.length > 0 ? (
          <Search
            list={data}
            searchTxt={searchTxt}
            completed={completed}
            showCompleted={showCompleted}
            subTaskComplete={subTaskComplete}
            ComplteTask={ComplteTask}
            editText={editText}
            theme={theme}
            clearSearchTxt={() => {
              Keyboard.dismiss();
              SetSearchTxt("");
            }}
          />
        ) : (
          <>
            <BottomModal
              theme={theme}
              isModal={isModal}
              newTask={newTask}
              subTask={newTask.isSubTask ? newTask.subtask : null}
              updateText={updateText}
              date={newTask ? newTask.time : null}
              openTimePicker={openTimePicker}
              addNewTask={addNewTask}
              closemodal={closeModal}
              handleKeyDown={handleKeyDown}
              updatesubText={updatesubText}
              backspaceClick={ClearKeyPress}
            />
            {data.length == 0 ? (
              <NoTask title="No tasks here yet" />
            ) : (
              <ScrollView>
                <View>
                  <FlatList
                    data={data}
                    renderItem={(data,index)=>renderItem(data,index)}
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
                        style={
                          ([styles.text],
                          { color: theme ? theme.black : "black" })
                        }
                      >
                        Completed {completed}
                      </Text>
                    </View>
                  ) : null}
                  {showCompleted ? (
                    <FlatList
                      data={data}
                      renderItem={(data,index)=>renderdoneItem(data,index)}
                      keyExtractor={(item) => item.id}
                    />
                  ) : null}
                </View>
              </ScrollView>
            )}

            <DateTimePicker
              show={showData}
              date={date}
              mode={dateMode}
              onChange={onChange}
              minimumDate={new Date()}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => clickHandler()}
              style={styles.touchableOpacityStyle}
            >
              <MaterialIcons
                name="add"
                size={66}
                color={theme ? theme.white : "white"}
              />
            </TouchableOpacity>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  completedHeader: {
    flexDirection: "row",
    margin: 15,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    borderRadius: 35,
    backgroundColor: "#FFC000",
    elevation: 3,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 5,
  },
});
