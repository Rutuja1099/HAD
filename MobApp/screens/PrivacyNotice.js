import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import NavigationBar from '../components/NavigationBar'

const PrivacyNotice = () => {
  return (
    <SafeAreaView className="bg-white flex-1 relative">
      <View className="flex-1 text-black pt-2 p-4 mt-4 ml-5 mr-5 shadow-lg bg-[#DDD4D4] rounded-lg">
      <Text style={{ fontFamily: 'System'}} className="text-lg">
        Your privacy matters. Here's a summary of how we handle your data:
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
        What We Collect:
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg">
        Personal details, usage data, and insights into your mental health.
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
        How We Use Your Data:
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg">
        To personalize your experience, improve our services, and enhance treatment outcomes.
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
          Data Sharing:
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg">
        We do not sell your data. We may share it with service providers or for legal compliance.      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
        Your Rights:
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg">
        Access, modify, or delete your data. By using our app, you consent to our privacy practices.
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg font-bold mt-2">
        Contact Us:
      </Text>
      <Text style={{ fontFamily: 'System'}} className="text-lg">
        If you have any questions or concerns about your privacy, please reach out to us.
      </Text>
      </View>
      <NavigationBar />
    </SafeAreaView>
  )
}

export default PrivacyNotice