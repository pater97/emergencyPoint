import React,{FC} from 'react';
import { Pressable,Text} from 'react-native';
// import commonStyle from '../styles/commonStyle';

interface ButtonBoxProps {
    callback:Function;
    label:string;
    callbackLong?:any;
    buttonContainerStyle?:object;
    buttonTextStyle?:object;
}

const ButtonBox:FC<ButtonBoxProps> = (props) => {

    const pressing = (): void => {
        !!props.callback()
    }

    const longPressing = (): void => {
        !!props.callbackLong()
    }

    return (
        <Pressable  style={props.buttonContainerStyle}>
            <Text style={props.buttonTextStyle} onPress={pressing} onLongPress={longPressing} >{props.label}</Text>
        </Pressable>
    );
};


export default ButtonBox;