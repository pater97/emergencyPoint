import React, { FC, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, ScrollView, View } from 'react-native';
// storage
import { getData, storeData } from '../utils/storage';
// styles
import CommonStyles from '../styles/CommonStyles';
// components
import InputBox from './InputBox';
import ButtonBox from './ButtonBox';

// translate
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


// traduzioni
const translations = {
  en: {
    description1: 'ATTENTION',
    description2: 'CONTACTS',
    description3: 'crossed out reds indicate an invalid number, it is possible to add it, but it is certainly not working'
  },
  it: {
    description1: 'ATTENZIONE: i ',
    description2: 'CONTATTI',
    description3: 'rossi sbarrati indicano un numero non validato, è possibile aggiungerlo, ma non è certo il funzionamento'
  }
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

// type
type PhoneContactsType = {
  name: string,
  number: string
}

// states
interface State {
  modalVisible: boolean;
  contacts: Array<PhoneContactsType>
}
const initialState: State = {
  modalVisible: false,
  contacts: []
}

// array di appoggio per il filter
let allContacts: Array<object> = []
// array che contiene i 5 contatti preferiti
let preferContacts: Array<object> = []

const ModalBoxSearch: FC = () => {

  const [state, setState] = useState<State>(initialState)

  // // use effect per popolare l'array di contatti
  useEffect(() => {
    getDataContacts()
  }, [])

  // funzione per chiamare lo storage dei contatti
  const getDataContacts = async () => {
    let contactsData = await getData('contacts')
    // inserisco nell'array di appoggio per il filtering
    allContacts = contactsData
    preferContacts = await getData('preferContacts')
    setState({
      ...state,
      contacts: contactsData
    })
  }

  // funzione per i preferiti
  const addPrefer = (element: object) => () => {
    console.log(preferContacts)
    if (preferContacts.length === 5) {
      preferContacts.splice(0, 1)
    }
    preferContacts.push(element)
    console.log('premuto', preferContacts)
  }

  function filterContacts(e: any) {
    let filteredContacts = allContacts.filter((contact) => {
      return (
        contact.name.includes(e)
      )
    })
    setState({
      ...state,
      contacts: filteredContacts
    })
  }

  const savePreferContacts = () => {
    storeData(preferContacts, 'preferContacts')
    console.log('salvato')
  }

  const MenageModal = (): void => {
    setState({
      ...state,
      modalVisible: !state.modalVisible
    })
  }

  const openModal = () => {
    setState({
      ...state,
      modalVisible: !state.modalVisible
    })
  }


  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={state.modalVisible}
        onRequestClose={MenageModal}>
        <View style={[CommonStyles.genericContainer, CommonStyles.fullScreenSize]}>
          <View style={styles.modalView}>
            <View style={CommonStyles.centerItems}>
              {/* questo sarà il search */}
              <InputBox
                callback={filterContacts}
                styleCss={CommonStyles.inputBox}
              />
              <Text style={CommonStyles.smallText}>{i18n.t('description1')} <Text style={[CommonStyles.lineThrough, CommonStyles.branColorText]}>{i18n.t('description2')} </Text> {i18n.t('description3')}</Text>
            </View>
            {/* qui andrù la lista di persone con i loro checkbox di conferma */}
            <ScrollView style={{ marginVertical: 10 }}>
              {
                state.contacts.map((element, index) => {
                  return (
                    <View style={[CommonStyles.rowHeader, CommonStyles.centerVertical, CommonStyles.paddingY]} key={index}>
                      {
                        element.number.toString().includes('+39')
                          ?
                          <Text style={[CommonStyles.lineThrough, CommonStyles.branColorText]}>
                            {element.name}
                          </Text>
                          :
                          <Text style={[CommonStyles.boldFont, { fontSize: 16 }]}>
                            {element.name}
                          </Text>
                      }
                      <ButtonBox
                        label={'+'}
                        callback={addPrefer(element)}
                        buttonContainerStyle={[CommonStyles.contacts, CommonStyles.trdBg, CommonStyles.centerItems, CommonStyles.marginRigth]}
                        buttonTextStyle={[CommonStyles.normalTextSize, CommonStyles.boldFont, CommonStyles.secondaryColorText]}
                      />
                    </View>
                  )
                })
              }
            </ScrollView>
            <View style={CommonStyles.centerItems}>
              {/* qui metterò il pulsante conferma scelta */}
              <ButtonBox
                label={'SALVA'}
                callback={savePreferContacts}
                buttonContainerStyle={[CommonStyles.brandColorBg, CommonStyles.squareButton]}
                buttonTextStyle={[CommonStyles.boldFont, CommonStyles.secondaryColorText]}
              />
            </View>
            <View style={CommonStyles.centerItems}>
              {/* bottone per chiudere il modal */}
              <ButtonBox
                label={'Chiudi'}
                callback={MenageModal}
                buttonContainerStyle={CommonStyles.squareButton}
                buttonTextStyle={[CommonStyles.underline, CommonStyles.normalTextSize, CommonStyles.branColorText]}
              />
            </View>
          </View>
        </View>
      </Modal>
      <View style={[CommonStyles.genericContainer, { width: 70 }]}>
        <ButtonBox
          label={'+'}
          callback={openModal}
          buttonContainerStyle={[CommonStyles.trdBg, CommonStyles.contacts, CommonStyles.centerItems]}
          buttonTextStyle={[CommonStyles.secondaryColorText, CommonStyles.boldFont, { fontSize: 25 }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '90%',
    height: '90%',
    backgroundColor: '#EDF2F4',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'blueviolet',
    height: 60,
    width: 60,
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#101010",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10,
    elevation: 12,
  },
  buttonClose: {
    backgroundColor: 'blueviolet',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalBoxSearch;