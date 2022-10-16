import { FC, useRef } from "react"
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";
import Header from "../components/Header";
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
    <View style={[CommonStyles.fullScreenSize,CommonStyles.genericContainer,CommonStyles.secondaryBg]}>
      <Header
      title="HOME"
      buttonVisible={false}
      />
      <View style={[CommonStyles.genericContainer,CommonStyles.paddingContainer]}>
        <Text style={[CommonStyles.textCenter,CommonStyles.paddingBottom,CommonStyles.titleFont,CommonStyles.branColorText]}>
           SEI IN UNA SITUAZIONE DI EMERGENZA?
        </Text>
        <Text style={CommonStyles.textCenter}>
          Premi il bottone sottostante per ricevere assistenza da uno dei tuoi contatti
        </Text>
      </View>
      <View style={[CommonStyles.container3,CommonStyles.paddingContainer,CommonStyles.centerItems]}>
        <ButtonBox
        label={'S.O.S'}
        callback={goToEmergency}
        buttonContainerStyle={[CommonStyles.buttonSos,CommonStyles.brandColorBg]}
        buttonTextStyle={[CommonStyles.boldFont,CommonStyles.secondaryColorText,CommonStyles.sosText]}
        />
      </View>
    </View>
  )
}

export default Home