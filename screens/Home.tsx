// import per il funzionamento 
import { FC, useState } from "react"
import { ImageBackground, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";
import Header from "../components/Header";

// props
interface HomeProps {
  navigation: any;
}
// traduzioni
const translations = {
  en: {
    emergency: 'ARE YOU IN EMERCGENCY?',
    homeCaption: 'press the button below to receive assistance',
    tutorial1: 'Press the s.o.s button to be tracked and have a shortcut to send your current location to your contacts or contact the rescuers',
    tutorial2: `In the 'Emergency' section then you can find the list of your favorite contacts, press the circular '+' button and select your favorites`,
    tutorialTitle2:'Add your favorite contacts',
    tutorial3: `In the event of an emergency, you can send a preset message indicating where you are and a help message. You can also choose whether to call or send the message with different methods`,
    tutorialTitle3:'in case of emergency'
  },
  it: {
    emergency: 'SEI IN UNA SITUAZIONE DI EMERGENZA?',
    homeCaption: 'Premi il bottone sottostante per ricevere assistenza da uno dei tuoi contatti',
    tutorial1: 'Premi il pulstante di s.o.s per essere rintracciato e avere una scorciatoia per inviare ai tuoi contatti la tua posizione attuale o contattare i soccorritori',
    tutorial2: `Nella sezione 'Emergency' quindi puoi trovare l'elenco dei contatti preferiti, premi il bottone circolare '+' e seleziona i tuoi preferiti`,
    tutorialTitle2:'Aggiungi i contatti preferiti',
    tutorial3: ` In caso di emergenza potrai inoltrare un messaggio preimpostato che indica il luogo in cui ti trovi e un messaggio di aiuto. Puoi scegliere inoltre se chiamare o inviare il messaggio con diversi metodi`,
    tutorialTitle3:'in caso di emergenza'
  }
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;


const Home: FC<HomeProps> = ({ navigation }) => {

  // font
  const [tutorialVisible, setTutorial] = useState(true)

  useFonts({
    'Kanit-Black': require('../assets/fonts/kaint/Kanit-Black.ttf'),
  });

  // bottoni
  const goToEmergency = (): void => {
    navigation.navigate('Emergency')
  }

  const tutorial = (): void => {
    setTutorial(!tutorialVisible)
  }

  const nulla = (): void => {
    console.log('cliccato')
  }

  return (
    <View style={[CommonStyles.positionRelative, CommonStyles.fullScreenSize, CommonStyles.genericContainer, CommonStyles.secondaryBg]}>
      {/* header */}
      <Header
        title="HOME"
        buttonVisible={false}
      />
      {/* immagine di sfondo */}
      <ImageBackground
        source={require('../assets/vawe.png')}
        resizeMode={"cover"}
        style={CommonStyles.imageBg}
      />
      {/* container princpale */}
      <View style={[CommonStyles.container2]}>
        <Text style={[{ fontFamily: 'Kanit-Black' }, CommonStyles.textCenter, CommonStyles.paddingBottom, CommonStyles.titleFont, CommonStyles.branColorText]}>
          {i18n.t('emergency')}
        </Text>
        <Text style={[{ fontFamily: 'Kanit-Black' }, CommonStyles.textCenter, CommonStyles.trdText, CommonStyles.normalTextSize, CommonStyles.paddingX]}>
          {i18n.t('homeCaption')}
        </Text>
      </View>
      <View style={[CommonStyles.container3, CommonStyles.paddingContainer, CommonStyles.centerItems]}>
        <ButtonBox
          label={'S.O.S'}
          callback={goToEmergency}
          buttonContainerStyle={[CommonStyles.buttonSos, CommonStyles.brandColorBg]}
          buttonTextStyle={[CommonStyles.boldFont, CommonStyles.secondaryColorText, CommonStyles.sosText]}
        />
      </View>
      <ImageBackground
        source={require('../assets/wave2.png')}
        resizeMode={"cover"}
        style={CommonStyles.imageBg}
      />
      {/* modale per tutorial */}
      <View style={[CommonStyles.positionAbsolute, CommonStyles.genericContainer, { top: 40, right: 10, zIndex: 10 }]}>
        <ButtonBox
          label={'📖'}
          callback={tutorial}
          buttonContainerStyle={[CommonStyles.contacts, CommonStyles.trdBg, CommonStyles.centerItems]}
          buttonTextStyle={[CommonStyles.normalTextSize, CommonStyles.boldFont, CommonStyles.secondaryColorText]}
        />
      </View>
      {/* pagina tutorial */}
      {
        tutorialVisible &&
        <View style={[CommonStyles.paddingContainer, CommonStyles.genericContainer, CommonStyles.secondaryBg, CommonStyles.positionAbsolute, CommonStyles.fullScreenSize, CommonStyles.centerVertical]}>
          <Text style={[CommonStyles.branColorText, CommonStyles.textCenter, CommonStyles.titleFont, { fontFamily: 'Kanit-Black' }]}>
            TUTORIAL
          </Text>
          <Text style={[CommonStyles.branColorText, CommonStyles.textCenter, CommonStyles.normalTextSize, { fontFamily: 'Kanit-Black' }]}>
            1. SOS
          </Text>
          <Text style={[CommonStyles.paddingBottom, CommonStyles.trdText, CommonStyles.textCenter, CommonStyles.normalTextSize, { fontFamily: 'Kanit-Black' }]}>
            {i18n.t('tutorial1')}
          </Text>
          <ButtonBox
            label={'S.O.S'}
            callback={nulla}
            buttonContainerStyle={[CommonStyles.contacts, CommonStyles.brandColorBg, CommonStyles.centerItems]}
            buttonTextStyle={[CommonStyles.boldFont, CommonStyles.secondaryColorText]}
          />
          <Text style={[CommonStyles.branColorText, CommonStyles.textCenter, CommonStyles.normalTextSize, { fontFamily: 'Kanit-Black' }]}>
            2. {i18n.t('tutorialTitle2')}
          </Text>
          <Text style={[CommonStyles.trdText, CommonStyles.textCenter, CommonStyles.normalTextSize, { fontFamily: 'Kanit-Black' }]}>
            {i18n.t('tutorial2')}
          </Text>
          <ButtonBox
            label={'+'}
            callback={nulla}
            buttonContainerStyle={[CommonStyles.contacts, CommonStyles.trdBg, CommonStyles.centerItems, CommonStyles.marginRigth]}
            buttonTextStyle={[CommonStyles.normalTextSize, CommonStyles.boldFont, CommonStyles.secondaryColorText]}
          />
          <Text style={[CommonStyles.branColorText, CommonStyles.textCenter, CommonStyles.normalTextSize, { fontFamily: 'Kanit-Black' }]}>
            3. {i18n.t('tutorialTitle3')}
          </Text>
          <Text style={[CommonStyles.trdText, CommonStyles.textCenter, CommonStyles.normalTextSize, { fontFamily: 'Kanit-Black' }]}>
            {i18n.t('tutorial3')}
          </Text>
          <ButtonBox
            label={'LANCIA S.O.S'}
            callback={nulla}
            buttonContainerStyle={[CommonStyles.squareButton, CommonStyles.brandColorBg]}
            buttonTextStyle={[CommonStyles.normalTextSize, CommonStyles.boldFont, CommonStyles.secondaryColorText]}
          />
        </View>
      }
    </View>
  )
}

export default Home