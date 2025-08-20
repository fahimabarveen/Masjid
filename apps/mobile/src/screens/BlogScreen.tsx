import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function BlogScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog</Text>
      <View style={styles.card}><Text>Thalim History - Article 1</Text></View>
      <View style={styles.card}><Text>Masjid History - Images placeholder</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, marginBottom: 10 },
  card: { backgroundColor: '#E8FFD7', padding: 12, borderRadius: 10, marginBottom: 12 }
})

