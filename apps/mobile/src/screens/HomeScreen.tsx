import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { PLACEHOLDER_PRAYER_TIMES } from '@shared/index'

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>﷽ Welcome</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Prayer Times</Text>
        {Object.entries(PLACEHOLDER_PRAYER_TIMES).map(([k, v]) => (
          <Text key={k} style={styles.text}>{k.toUpperCase()}: {v}</Text>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hadith of the Day</Text>
        <Text style={styles.text}>Actions are judged by intentions...</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 28, marginBottom: 12 },
  card: { backgroundColor: '#E8FFD7', padding: 12, borderRadius: 10, marginBottom: 12 },
  cardTitle: { fontWeight: 'bold', marginBottom: 6 },
  text: { fontSize: 14 }
})

