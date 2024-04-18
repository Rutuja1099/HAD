import React from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons';

const EmergencyContact = () => {
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="flex-1 text-black pt-2 p-4 mt-4 ml-5 mr-5 mb-4 shadow-lg bg-[#DDD4D4] rounded-lg">
        <ScrollView>
          <Text style={{ fontFamily: 'System'}} className="text-lg mt-2">
            We are there to help you
          </Text>
          <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-4">
            Emergency Hotline/Contact:
          </Text>

          <View className="flex-row gap-4 mt-4 ml-2">
            <Feather name="phone-call" size={24} color="black" />
            <Text style={{ fontFamily: 'System'}} className="text-lg">
              91 80 26995000
            </Text>
          </View>

          <View className="flex-row gap-4 mt-2 ml-2">
            <Feather name="phone-call" size={24} color="black" />
            <Text style={{ fontFamily: 'System'}} className="text-lg">
              91 80 26995100
            </Text>
          </View>

          <View className="flex-row gap-4 mt-2 ml-2">
            <Feather name="phone-call" size={24} color="black" />
            <Text style={{ fontFamily: 'System'}} className="text-lg">
              91 80 26995200
            </Text>
          </View>

          <View className="flex-row gap-4 mt-2 ml-2">
            <Feather name="phone-call" size={24} color="black" />
            <Text style={{ fontFamily: 'System'}} className="text-lg">
              91 80 26995300
            </Text>
          </View>

          <View className="flex-row gap-4 mt-2 ml-2">
            <Feather name="phone-call" size={24} color="black" />
            <Text style={{ fontFamily: 'System'}} className="text-lg">
              91 80 26995400
            </Text>
          </View>
        </ScrollView>
      </View>
      {/* <NavigationBar /> */}
    </SafeAreaView>
  )
}

export default EmergencyContact