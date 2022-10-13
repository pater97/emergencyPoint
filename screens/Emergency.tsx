import { FC } from "react"
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";
import PhoneContacts from "../components/PhoneContacts";

interface EmergencyProps {
    navigation:any;
}

const Emergency:FC<EmergencyProps> = ({ navigation }) => {

    const goToHome = ():void => {
        navigation.navigate('Home')
    }

  return (
    <View style={[CommonStyles.fullScreenSize,CommonStyles.genericContainer]}>
        <View style={CommonStyles.genericContainer}>
            <Text>
                Emergency
            </Text>
            <ButtonBox
            label={'vai al pannello Home'}
            callback={goToHome}
            />
        </View>
        <View style={CommonStyles.container2}>
            <PhoneContacts/>
        </View>
    </View>
  )
}

export default Emergency