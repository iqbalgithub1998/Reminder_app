import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

export default class InputText extends Component {
  constructor(props) {
    super(props);
    this.innerRef = React.createRef();
  }

  componentDidMount() {
    // This should fix the autoFocus issue.
    setTimeout(() => {
      this.innerRef.current.focus();
    }, 1);
  }
  render() {
    const {
      issubTask,
      value,
      handleKeyDown,
      placeholder,
      backspaceClick,
      theme,
    } = this.props;
    return (
      <View>
        <TextInput
          value={value ? value : null}
          placeholder={placeholder}
          style={[styles.textinput, { color: theme ? theme.black : "black" }]}
          multiline={true}
          autoFocus={true}
          placeholderTextColor="#8e8e8e"
          returnKeyType="go"
          blurOnSubmit={true}
          //onKeyPress={backspaceClick}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              issubTask ? backspaceClick() : null;
            }
          }}
          onSubmitEditing={handleKeyDown}
          onChange={(event) => {
            this.props.changeText(event.nativeEvent.text);
          }}
          ref={this.innerRef}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
