import React, { useState, useContext } from "react"
import { View, StyleSheet } from "react-native"

import { Navbar } from "./components/navbar"
import { MainScreen } from "./screens/MainScreen"
import { TodoScreen } from "./screens/TodoScreen"
import { TodoContext } from "./context/todo/todoContext"
import { ScreenContext } from "./context/screen/screenContext"

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

  return (
    <View>
      <Navbar title="TODO app" />
      {todoId ? <TodoScreen /> : <MainScreen />}
    </View>
  )
}
