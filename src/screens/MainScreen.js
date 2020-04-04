import React, { useState, useEffect, useContext } from "react"
import { View, FlatList, StyleSheet, Image, Dimensions } from "react-native"
import { Todo } from "../components/Todo"
import { AddTodo } from "../components/AddTodo"
import { THEME } from "../../theme"
import { TodoContext } from "../context/todo/todoContext"
import { ScreenContext } from "../context/screen/screenContext"

export const MainScreen = () => {
  const { todos, addTodo, removeTodo } = useContext(TodoContext)
  const { changeScreen } = useContext(ScreenContext)

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING * 2
  )

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get("window").width - THEME.PADDING * 2
      setDeviceWidth(width)
    }

    Dimensions.addEventListener("change", update)

    return () => {
      Dimensions.removeEventListener("change", update)
    }
  })

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} removeTodo={removeTodo} openTodo={changeScreen} />
        )}
      />
    </View>
  )

  if (todos.length === 0) {
    content = (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require("../../assets/empty.jpg")}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  list: {},
  imgWrap: {
    justifyContent: "center",
    alignItems: "center",
    padding: THEME.PADDING,
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
})
