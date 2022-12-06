import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface Props {
    title: string;
}

const Button = ({title} : Props) => {
  return (
    <TouchableOpacity>
      <View >
        <Button title={title}/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
})

export default Button
