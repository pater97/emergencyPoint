import { FC } from "react"
import { Image, Text, View } from 'react-native';
// translation
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";
import PhoneContacts from "../components/PhoneContacts";
import Maps from "../components/Maps";
import SosModal from "../components/SosModal";
import Header from "../components/Header";

interface EmergencyProps {
    navigation: any;
}

// traduzioni
const translations = {
    en: {
        mapTitle: 'YOUR CURRENT LOCATION',
    },
    it: {
        mapTitle: 'LA TUA POSIZIONE ATTUALE',
    }
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;


const Emergency: FC<EmergencyProps> = ({ navigation }) => {

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <View style={[CommonStyles.fullScreenSize, CommonStyles.genericContainer]}>
            <Header
                title="EMERGENCY"
                headerFunction={goBack}
                buttonVisible={true}
            />
            <View style={[CommonStyles.container2, CommonStyles.brandColorBg, CommonStyles.paddingContainer]}>
                <Text style={[CommonStyles.normalTextSize, CommonStyles.secondaryColorText, CommonStyles.paddingBottom, CommonStyles.textCenter, { fontFamily: 'Kanit-Black' }]}>
                    {i18n.t('mapTitle')}
                </Text>
                <Maps />
            </View>
            <Image
                style={CommonStyles.image}
                source={require('../assets/vawe.png')}
            />
            <View style={CommonStyles.container2}>
                <View style={CommonStyles.genericContainer}>
                    <PhoneContacts />
                </View>
                <View style={CommonStyles.genericContainer}>
                    <SosModal />
                </View>
            </View>
        </View>
    )
}

export default Emergency