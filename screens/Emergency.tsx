import { FC } from "react"
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";
import PhoneContacts from "../components/PhoneContacts";
import Maps from "../components/Maps";
import SosModal from "../components/SosModal";
import Header from "../components/Header";

interface EmergencyProps {
    navigation:any;
}

const Emergency:FC<EmergencyProps> = ({ navigation }) => {

    const goBack = () => {
        navigation.goBack()
    }

  return (
    <View style={[CommonStyles.fullScreenSize,CommonStyles.genericContainer]}>
        <Header
        title="EMERGENCY"
        headerFunction={goBack}
        buttonVisible={true}
        />
        <View style={[CommonStyles.genericContainer,CommonStyles.brandColorBg,CommonStyles.paddingContainer]}>
            <Text style={[CommonStyles.textCenter,CommonStyles.normalTextSize,CommonStyles.secondaryColorText,CommonStyles.boldFont,CommonStyles.paddingBottom]}>
                LA TUA POSIZIONE ATTUALE
            </Text>
            <Maps/>
        </View>
        <View style={CommonStyles.container2}>
            <PhoneContacts/>
            <SosModal/>
        </View>
    </View>
  )
}

export default Emergency