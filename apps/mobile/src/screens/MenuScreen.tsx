import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function MenuScreen() {
  const [lang, setLang] = React.useState<'en'|'ta'|'ar'>('en')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Text>Language: {lang}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, marginBottom: 10 }
})

