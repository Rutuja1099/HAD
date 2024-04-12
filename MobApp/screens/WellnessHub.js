import { View, SafeAreaView, Text, Pressable, ScrollView, TextInput } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const WellnessHub = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filters = ["All", "My Queries"];
  const [newMessage, setNewMessage] = useState('');

  //content for all filter : This should be populated from DB result
  const [allFilterContent,setAllFilterContent] = useState([
    {questionId:1,question:"How to boost morale", answers:'3 replies', questionTimestamp:'2024-02-11T12:11:46.000+05:30'},
    {questionId:2, question:"How to deal with depression", answers:'2 replies', questionTimestamp:'2023-03-21T12:11:46.000+05:30'},
    {questionId:2, question:"How to deal withhhhhhhhhhhh anxietyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", answers:'2 replies',questionTimestamp:'2024-03-21T12:11:46.000+05:30'}
  ]);  

  //content for my queries filter : This should be populated from DB result
  const [myQueriesContent,setMyQueriesContent] = useState([
    {questionId:3,question:"How to lead a healthy lifestyle", answers:'2 replies',questionTimestamp:'2024-03-21T12:47:00.000+05:30'}
  ]);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollViewRef.current.scrollToEnd({ animated: false });
}, [newMessage]);

  // Function to render questions based on selected filter
  const renderQuestions = () =>{
    let filteredContent = selectedFilter === "All" ? allFilterContent : myQueriesContent;
    
    if (newMessage.trim() !== '') {
      // If search query is not empty, filter the content based on the search query
      const regex = new RegExp(newMessage, 'i'); 
      filteredContent = filteredContent.filter(item => regex.test(item.question)
      );
    }

    //if search result is empty
    if (filteredContent.length === 0) {
      return (
        <View className='flex-row bg-white border-b-2 border-[#F4F2F1] border-opacity-5 m-5 h-auto'style={{ maxWidth: '80%' }}>
          <Text className='mb-2 justify-center text-sm font-semibold text-[#573926]'>No matching queries found</Text>
        </View>
      );
    }

    return filteredContent.map((item, index) =>(
        // Enter <Pressable> element here=> provide the navigate to function for next page
        <View key={index} className='flex-row bg-white border-b-2 border-[#F4F2F1] border-opacity-5 m-5 h-auto 'style={{ maxWidth: '80%' }}>
          <Icon
            name='user-circle'
            size={50}
            color='#4DD8CF'
          />
          <View className='flex-col ml-4' style={{ marginLeft: 10, maxWidth: '70%'}}>
            <Text className="mt-2 mb-2 justify-center text-sm font-semibold text-[#573926] self-start">{item.question}</Text>
            <View className='flex-row mb-2 mt-1'>
                <Icon name='envelope-o' color='gray' size={20} />
                <Text className="ml-1">{item.answers}</Text>
                <Text className="ml-10 mt-1 mr-1 text-xs text-gray-500 self-start text-right">{calculateTimeDifference(item.questionTimestamp)}</Text>
            </View>
          </View>
        </View>
      ));
  } 

  //handle filter click
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  }

  // sending queries
  const [messages, setMessages] = useState([
    { text: 'Hello!', time: '10:00 AM'},
    { text: 'Hi there!', time: '10:05 AM'},
  ]);

  const calculateTimeDifference = (messageTime) => {
    const currentTime = new Date();
    const messageDate = new Date(messageTime);

    const differenceInMilliseconds = Math.abs(currentTime - messageDate);
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } if(seconds===0){
      return `now`;
    }
    else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
};


  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const currentTime = new Date().toString(); // Get current time in ISO format
    const newQuestion = {
      questionId: allFilterContent.length + 1, // Increment questionId for each new question
      question: newMessage,
      answers: '0 replies', // initially there are no replies
      questionTimestamp: currentTime,
    };

    //*****Later this will go as a body in database so json post request should be constructed
    setAllFilterContent([...allFilterContent, newQuestion]);
    setMyQueriesContent([...myQueriesContent, newQuestion]);
    setNewMessage('');
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flexDirection: 'row', padding: 2, borderRadius: 20, marginLeft: 4, marginRight: 12, marginTop: 6, width: 200, height: 81, backgroundColor: 'white' }}>
        {/* filters */}
        {filters.map((filter, index) => (
          <Pressable key={index} onPress={() => handleFilterClick(filter)}>
            <View key={index} style={{ margin: '2%', marginHorizontal: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: selectedFilter === filter ? '#4DD8CF': '#F4F2F1', borderRadius: 8, width: 170, height:50 }}>
              <Text style={{ fontFamily: 'System', color: selectedFilter === filter ? 'white':'#8A8A8A', fontSize: 18, fontWeight:selectedFilter === filter ? 'bold':null}}>
                {filter}
              </Text>
          </View>
          </Pressable>
        ))}
      </View>
      {/* Rendering Content based on selected filter */}
      <ScrollView
        className = "flex-1 p-4 pb-20"
        ref={scrollViewRef}
        contentOffset={{ y: 1000000 }}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
      >
        <View className="flex-1 bg-white">
          {renderQuestions()}
        </View>
      </ScrollView>

      {/* Sending Message: Message box */}
      <View className = "absolute bottom-0 left-0 right-0 flex-row items-center border-t border-gray-300 p-4 bg-white">             
        <TextInput
          className = "flex-1 border border-gray-300 rounded-full px-4 py-2 mr-4"
          placeholder="Type your query..."
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          onSubmitEditing={handleSend}
        />          
        <Icon
          name="send" // Use the send icon from FontAwesome
          size={25}
          color="#4DD8CF"
          onPress={handleSend} // Handle sending message on button press
        />          
      </View>
    </SafeAreaView>
  );
};

export default WellnessHub;
