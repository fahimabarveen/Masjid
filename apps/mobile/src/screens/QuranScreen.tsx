import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

const surah = Array.from({ length: 30 }, (_, i) => ({ id: i + 1, name: `Surah ${i + 1}` }))

export default function QuranScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quran</Text>
      <FlatList
        data={surah}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}><Text>{item.name}</Text></TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 10 },
  item: { padding: 12, backgroundColor: '#E8FFD7', borderRadius: 8, marginBottom: 8 }
})

