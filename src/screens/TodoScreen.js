import React, { useState, useContext } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { FontAwesome, AntDesign } from "@expo/vector-icons"

import { THEME } from "../../theme"
import { AppCard } from "../ui/AppCard"
import { EditModal } from "../components/EditModal"
import { AppTextBold } from "../ui/AppTextBold"
import { AppButton } from "../ui/AppButton"
import { TodoContext } from "../context/todo/todoContext"
import { ScreenContext } from "../context/screen/screenContext"

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext)
  const { todoId, changeScreen } = useContext(ScreenContext)

  const todo = todos.find((t) => t.id === todoId)

  const [modal, setModal] = useState(false)

  const saveHandler = (title) => {
    updateTodo(todo.id, title)
    setModal(false)
  }

  return (
    <View style={styles.todoScreen}>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.todoTitle}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name="remove" size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  todoScreen: {
    padding: 15,
  },
  todoTitle: {
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    // width: Dimensions.get("window").width / 3,
    width: Dimensions.get("window").width > 400 ? 250 : 150,
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
})
