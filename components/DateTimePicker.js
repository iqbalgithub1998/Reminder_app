import React from "react";
import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default App = ({ show, date, mode, onChange }) => {
  return (
    <View style={{ marginTop: 50 }}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
