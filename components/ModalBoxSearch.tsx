import React, { FC, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, ScrollView, View } from 'react-native';
// storage
import { getData, storeData } from '../utils/storage';
// styles
import CommonStyles from '../styles/CommonStyles';
// components
import InputBox from './InputBox';
import ButtonBox from './ButtonBox';

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

            {/* questo sarà il search */}
            <InputBox
              callback={filterContacts}
            />
            {/* qui andrù la lista di persone con i loro checkbox di conferma */}
            <ScrollView>
              {
                state.contacts.map((element, index) => {
                  return (
                    <View key={index}>
                      {
                        element.number.toString().includes('+39') 
                        ?
                        <Text style={CommonStyles.boldFont}>
                          {element.name}
                        </Text>
                        :
                        <Text>
                          {element.name}
                        </Text>
                      }
                      <ButtonBox
                        label={'add'}
                        callback={addPrefer(element)}
                      />
                    </View>
                  )
                })
              }
            </ScrollView>
            {/* qui metterò il pulsante conferma scelta */}
            <ButtonBox
              label={'SALVA'}
              callback={savePreferContacts}
            />
            {/* bottone per chiudere il modal */}
            <ButtonBox
              label={'Chiudi'}
              callback={MenageModal}
            />
          </View>
        </View>
      </Modal>
      <View style={{width:70}}>
        <ButtonBox
          label={'+'}
          callback={openModal}
          buttonContainerStyle={[CommonStyles.brandColorBg,CommonStyles.contacts,CommonStyles.centerItems]}
          buttonTextStyle={[CommonStyles.secondaryColorText,CommonStyles.boldFont,{fontSize:30}]}
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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