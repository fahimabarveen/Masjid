import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default function DonationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation</Text>
      <View style={styles.card}><Text>Scan to Donate [QR Placeholder]</Text></View>
      <Button title="Open Scanner (placeholder)" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, marginBottom: 10 },
  card: { backgroundColor: '#E8FFD7', padding: 12, borderRadius: 10, marginBottom: 12 }
})

