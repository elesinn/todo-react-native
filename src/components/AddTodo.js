import React, { useState } from "react"
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
} from "react-native"
import { THEME } from "../../theme"
import { AntDesign } from "@expo/vector-icons"

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("")

  const submitHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue("")
      Keyboard.dismiss()
    } else {
      Alert.alert("Поле не может быть пустым")
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Введите название задачи..."
        autoCorrect={false}
        autoCapitalize="none"
      />
      {/* <Button style={styles.button} title="Добавить" onPress={submitHandler} /> */}
      <AntDesign.Button name="pluscircleo" onPress={submitHandler}>
        Добавить
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "65%",
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 10,
  },
  button: {
    justifyContent: "center",
  },
})
