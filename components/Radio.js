import { View, Text } from 'react-native';
import React from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import CommonStyles from '../style/CommonStyles';


const Radio = ({items, setSelectedValue}) => {
  return (
    <RadioGroup  
    layout="row"
    labelStyle={{ marginRight: 10 }}
    radioButtons={items} 
    onPress={(radioButtonsArray)=>{
        const selected= radioButtonsArray.filter((item)=>{
            return item.selected === true;
        });
        setSelectedValue(selected[0].id);
    }}
    
/>
  )
};

export default Radio;