import { FC, useRef } from "react"
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";
// lottie
import LottieView from 'lottie-react-native';


interface HomeProps {
    navigation:any;
}

const Home:FC<HomeProps> = ({ navigation }) => {

    const animation = useRef(null);

    const goToEmergency = ():void => {
        navigation.navigate('Emergency')
    }

  return (
    <View style={[CommonStyles.fullScreenSize,CommonStyles.genericContainer,CommonStyles.brandColorBg]}>
        <Text>
            HOME
        </Text>
        <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        source={require('../assets/croce.json')}
      />
        <ButtonBox
        label={'vai al pannello emergency'}
        callback={goToEmergency}
        />
    </View>
  )
}

export default Home