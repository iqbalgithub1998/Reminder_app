import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  CheckBox,
  FlatList,
} from "react-native";
import InputText from "./InputText";

export class BottomModal extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSubTasks = (st, index) => {
    return (
      <View style={styles.subArray}>
        <CheckBox
          tintColors={{ true: "#ccccd9", false: "black" }}
          value={st.done}
          style={styles.checkbox}
        />
        <InputText
          theme={this.props.theme}
          issubTask={true}
          value={st.sub_task}
          changeText={(text) => this.props.updatesubText(index, text)}
          placeholder="enter sub task"
          handleKeyDown={this.props.handleKeyDown}
          backspaceClick={() => this.props.backspaceClick(index)}
        />
      </View>
    );
  };

  render() {
    let {
      newTask,
      updateText,
      openTimePicker,
      date,
      addNewTask,
      isModal,
      handleKeyDown,
      subTask,
      closemodal,
      theme,
    } = this.props;
    return (
      <Modal animationType={"slide"} transparent={true} visible={isModal}>
        <TouchableWithoutFeedback onPress={closemodal}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor: theme
                  ? theme.modalback
                  : "rgba(247, 247, 247,0.2)",
              },
            ]}
          >
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme ? theme.listcolor : "#FFFFFF" },
              ]}
            >
              <View>
                <InputText
                  value={newTask.task}
                  changeText={(text) => updateText(text)}
                  handleKeyDown={handleKeyDown}
                  theme={theme}
                  placeholder='Tap "Enter" to create subtasks'
                />
                {subTask ? (
                  <FlatList
                    data={subTask}
                    renderItem={({ item, index }) =>
                      this.renderSubTasks(item, index)
                    }
                    keyExtractor={(item) => item.id}
                  />
                ) : null}
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={[
                      styles.reminder,
                      {
                        backgroundColor: theme
                          ? theme.reminderColor
                          : "#EEEEEE",
                      },
                    ]}
                    onPress={openTimePicker}
                  >
                    {date ? (
                      <Text style={{ color: "#616161" }}>{date}</Text>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <Ionicons
                          name="alarm-outline"
                          size={16}
                          color="#616161"
                          style={{ marginRight: 2 }}
                        />
                        <Text style={{ color: "#616161" }}>set reminder</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={styles.button}>
                    {newTask.task.length == 0 ? (
                      <TouchableWithoutFeedback
                        style={{
                          paddingTop: 7,
                          paddingBottom: 5,
                          paddingHorizontal: 30,
                        }}
                      >
                        <Text style={styles.doneBtn2}>done</Text>
                      </TouchableWithoutFeedback>
                    ) : (
                      <TouchableOpacity
                        style={{
                          paddingTop: 7,
                          paddingBottom: 5,
                          paddingHorizontal: 30,
                        }}
                        onPress={addNewTask}
                      >
                        <Text style={styles.doneBtn1}>done</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    elevation: 3,
    margin: 5,
  },
  doneBtn1: {
    fontSize: 16,
    color: "#FFC000",
  },
  doneBtn2: {
    fontSize: 16,
    color: "#CCCCCC",
  },
  footer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContent: {
    width: "100%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  reminder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 30,
    borderRadius: 15,
  },
  subArray: {
    flexDirection: "row",
  },
});
