import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function SpecialScreen() {
  const [count, setCount] = React.useState(0)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special</Text>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Death Salath Guide</Text>
        <Text>1) Niyyah  2) Takbeer  3) Four Takbeers with duas  4) Salam</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.subtitle}>Tasbeeh Counter</Text>
        <Text style={styles.counter}>{count}</Text>
        <Button title="+1" onPress={() => setCount(c => c + 1)} />
        <Button title="Reset" onPress={() => setCount(0)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, marginBottom: 10 },
  subtitle: { fontWeight: 'bold', marginBottom: 6 },
  card: { backgroundColor: '#E8FFD7', padding: 12, borderRadius: 10, marginBottom: 12 },
  counter: { fontSize: 28, marginVertical: 8 }
})

