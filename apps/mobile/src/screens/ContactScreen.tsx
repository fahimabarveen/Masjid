import React from 'react'
import { View, Text, StyleSheet, Linking, Button } from 'react-native'

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact</Text>
      <Button title="Call" onPress={() => Linking.openURL('tel:+1000000000')} />
      <Button title="WhatsApp" onPress={() => Linking.openURL('https://wa.me/1000000000')} />
      <View style={styles.card}><Text>Help chatbot placeholder</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, marginBottom: 10 },
  card: { backgroundColor: '#E8FFD7', padding: 12, borderRadius: 10, marginTop: 12 }
})

