import { FC } from "react"
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";


interface HomeProps {
    navigation:any;
}

const Home:FC<HomeProps> = ({ navigation }) => {

    const goToEmergency = ():void => {
        navigation.navigate('Emergency')
    }

  return (
    <View style={[CommonStyles.fullScreenSize,CommonStyles.genericContainer]}>
        <Text>
            HOME
        </Text>
        <ButtonBox
        label={'vai al pannello emergency'}
        callback={goToEmergency}
        />
    </View>
  )
}

export default Home