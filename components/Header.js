import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
} from "react-native";
import { Feather, AntDesign, Foundation } from "@expo/vector-icons";

export default function Header({ gotoSetting, onSearch, searchText, theme }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.search,
          { backgroundColor: theme ? theme.searchbar : "#ededed" },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <Feather
            name="search"
            size={24}
            color="#8e8e8e"
            style={styles.icon}
          />
          <ScrollView>
            <TextInput
              placeholder="Search for tasks"
              value={searchText}
              onChangeText={onSearch}
              placeholderTextColor="#8e8e8e"
              style={[styles.searchText, { color: "#8e8e8e" }]}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  hContainer: {
    flexDirection: "row",

    width: "90%",
    margin: 5,
  },
  hText: {
    left: "45%",
    fontWeight: "bold",
  },
  search: {
    width: "90%",
    height: 45,

    borderRadius: 20,
    justifyContent: "center",
  },
  icon: {
    marginLeft: 10,
  },
  searchText: {
    fontSize: 20,
    marginLeft: 20,
  },
});
