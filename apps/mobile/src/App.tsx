import React from 'react'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Text, View, Pressable, useColorScheme } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import MenuScreen from './screens/MenuScreen'
import DonationScreen from './screens/DonationScreen'
import QuranScreen from './screens/QuranScreen'
import SpecialScreen from './screens/SpecialScreen'
import ContactScreen from './screens/ContactScreen'
import BlogScreen from './screens/BlogScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  const scheme = useColorScheme()
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Menu" component={MenuScreen} />
          <Tab.Screen name="Donate" component={DonationScreen} />
          <Tab.Screen name="Quran" component={QuranScreen} />
          <Tab.Screen name="Special" component={SpecialScreen} />
          <Tab.Screen name="Contact" component={ContactScreen} />
          <Tab.Screen name="Blog" component={BlogScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

