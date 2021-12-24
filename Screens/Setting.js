import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SwitchCustom from "expo-custom-switch";
import PopOver from "../components/PopOver";
import { lightcolor, darkcolor } from "../config/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeContext from "../config/context";
const Setting = ({ navigation }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [settings, setSettings] = useState({
    darkMode: false,
    fontSize: "small",
    sortBy: "By creation date",
    priorityReminder: false,
    cloudUpload: false,
    email: "",
  });
  useEffect(() => {
    getSettingsfromStorage();
  }, []);

  const getSettingsfromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem("doreminderTheme");
      if (data) {
        const jsonData = JSON.parse(data);
        setSettings({ ...jsonData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSetting = (name, value) => {
    const set = { ...settings };
    set[name] = value;
    if (name === "darkMode") {
      if (value === true) {
        setTheme({ ...darkcolor });
      } else {
        setTheme({ ...lightcolor });
      }
    }
    setSettings((ps) => ({ ...ps, [name]: value }));
    setSettingToStorage(set);
  };

  const setSettingToStorage = async (set) => {
    try {
      const jsonData = JSON.stringify({ ...set });
      await AsyncStorage.setItem("doreminderTheme", jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme ? theme.screen : "#F7F7F7" },
      ]}
    >
      <View style={styles.innerContainer}>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
              name="back"
              size={28}
              color={theme ? theme.black : "black"}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 25,
              paddingTop: 5,
              color: theme ? theme.black : "black",
            }}
          >
            Tasks
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 100 }}
        >
          <View style={styles.styleContainer}>
            <Text style={{ color: "#ccccd9", fontSize: 18 }}>STYLE</Text>
            <View style={styles.property}>
              <Text
                style={{
                  fontSize: 18,
                  paddingTop: 5,
                  color: theme ? theme.black : "black",
                }}
              >
                Dark Mode
              </Text>
              <SwitchCustom
                value={settings.darkMode}
                onChange={(value) => updateSetting("darkMode", value)}
                leftColor={theme ? theme.switchOff : "#ccccd9"}
                rightColor={theme ? theme.switchOn : "#DFDFDF"}
                iconLeft={{
                  name: "moon-waxing-crescent",
                  color: "#000000",
                  style: {
                    height: 22,
                    width: 22,
                  },
                }}
                iconRight={{
                  name: "white-balance-sunny",
                  color: "#fff",
                  style: {
                    height: 22,
                    width: 22,
                  },
                }}
              />
            </View>
            <View style={styles.property}>
              <Text
                style={{
                  fontSize: 18,
                  paddingTop: 5,
                  color: theme ? theme.black : "black",
                }}
              >
                Font size
              </Text>
              <View style={{ justifyContent: "center" }}>
                <PopOver
                  value={settings.fontSize}
                  valueArray={["small", "medium", "large"]}
                  updateValue={(value) => {
                    updateSetting("fontSize", value);
                  }}
                />
              </View>
            </View>
            <View style={styles.property}>
              <Text
                style={{
                  fontSize: 18,
                  paddingTop: 5,
                  color: theme ? theme.black : "black",
                }}
              >
                Sort by
              </Text>
              <View style={{ justifyContent: "center" }}>
                <PopOver
                  value={settings.sortBy}
                  valueArray={["By creation date", "By modification date"]}
                  updateValue={(value) => {
                    updateSetting("sortBy", value);
                  }}
                />
              </View>
            </View>
            <View style={styles.line}></View>
            <Text style={{ color: "#ccccd9", fontSize: 18 }}>REMINDERS</Text>
            <View style={styles.property}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    paddingTop: 5,
                    color: theme ? theme.black : "black",
                  }}
                >
                  High-priority reminder
                </Text>
                <Text style={{ fontSize: 12, color: "#ccccd9" }}>
                  Ignore Silent mode and keep playing
                </Text>
                <Text style={{ fontSize: 12, color: "#ccccd9" }}>
                  sound until the alarm is turned off
                </Text>
              </View>
              <SwitchCustom
                value={settings.priorityReminder}
                onChange={(value) => updateSetting("priorityReminder", value)}
                leftColor={theme ? theme.switchOff : "#ccccd9"}
                rightColor={theme ? theme.switchOn : "#DFDFDF"}
                iconLeft={{
                  name: "alarm-note-off",
                  color: "#000",
                  style: {
                    height: 22,
                    width: 22,
                  },
                }}
                iconRight={{
                  name: "alarm",
                  color: "#fff",
                  style: {
                    height: 22,
                    width: 22,
                  },
                }}
              />
            </View>
            <View style={styles.line}></View>
            <Text style={{ color: "#ccccd9", fontSize: 18 }}>
              ADDITIONAL SETTINGS
            </Text>
            <View style={styles.property}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    paddingTop: 5,
                    color: theme ? theme.black : "black",
                  }}
                >
                  Upload to Cloud
                </Text>
                <Text style={{ fontSize: 12, color: "#ccccd9" }}>
                  Upload yours task to cloud storage
                </Text>
              </View>
              <SwitchCustom
                value={settings.cloudUpload}
                onChange={(value) => updateSetting("cloudUpload", value)}
                leftColor={theme ? theme.switchOff : "#ccccd9"}
                rightColor={theme ? theme.switchOn : "#DFDFDF"}
                iconLeft={{
                  name: "cloud-sync-outline",
                  color: "#000",
                  style: {
                    height: 22,
                    width: 22,
                  },
                }}
                iconRight={{
                  name: "cloud-upload-outline",
                  color: "#fff",
                  style: {
                    height: 22,
                    width: 22,
                  },
                }}
              />
            </View>
            {settings.cloudUpload ? (
              <View>
                <TouchableOpacity style={styles.getButton}>
                  <Text style={styles.btntxt}>GET task from cloud</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.getButton}>
                  <Text style={styles.btntxt}>UPLOAD task to cloud</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.getButton}>
                  <Text style={styles.btntxt}>DELETE task to cloud</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <View style={styles.line}></View>
          <Text style={{ color: "#ccccd9", fontSize: 18 }}>OTHERS</Text>
          <View style={styles.property}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  paddingTop: 5,
                  color: theme ? theme.black : "black",
                }}
              >
                Privacy Policy
              </Text>
            </View>
            <AntDesign
              name="right"
              size={24}
              color={theme ? theme.black : "black"}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  btntxt: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  getButton: {
    marginTop: 10,
    backgroundColor: "#ccccd9",
    width: "100%",
    height: 50,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    marginHorizontal: 15,
  },
  icons: {
    padding: 5,
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#DADADA",
    marginVertical: 25,
    borderRadius: 1,
  },
  property: {
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  styleContainer: {
    paddingTop: 20,
    paddingLeft: 7,
  },
});
