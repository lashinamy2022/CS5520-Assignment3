import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import TimelineList from '../components/TimelineList';
import Label from '../components/Label';
import CommonStyles from '../style/CommonStyles';
const Itinerary = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Label content="Vancouver" customizedStyle={{fontSize: 30, paddingLeft: 15, paddingTop: 5}}/>
      <Label content="5 days" customizedStyle={{marginTop:5, fontSize: 15, paddingLeft: 15}}/>
      <TimelineList />
    </SafeAreaView>
  )
}

export default Itinerary;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
      
    },
    pressableAreaCustom: [{
      marginTop: 20, 
      width: 150, 
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    }, 
    CommonStyles.greenBackground]
   
  });