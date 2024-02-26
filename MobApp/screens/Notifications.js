import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import NotificationMenuItems from '../components/NotificationMenuItems'
import NavigationBar from '../components/NavigationBar'

const Notifications = () => {
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="flex-1 bg-white relative mt-8 ml-4">
        <NotificationMenuItems
          menuItemLabel="Notification 1"
          menuItemContent="You have an appointment today"
        />
        <NotificationMenuItems
          menuItemLabel="Notification 2"
          menuItemContent="Time for exercise"
        />
      </View>
      <NavigationBar />
    </SafeAreaView>
  )
}

export default Notifications