import React, { FC, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, ScrollView, View, Linking } from 'react-native';

// storage
import { getData, storeData } from '../utils/storage';
// styles
import CommonStyles from '../styles/CommonStyles';
// components
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

// array che contiene i 5 contatti preferiti
let preferContacts: Array<object> = []

const SosModal: FC = () => {

    const [state, setState] = useState<State>(initialState)

    // // use effect per popolare l'array di contatti
    useEffect(() => {
        getDataContacts()
    }, [])

    // funzione per chiamare lo storage dei contatti
    const getDataContacts = async () => {
        preferContacts = await getData('preferContacts')
    }
    // sos
    const getSos = async () => {
        await Linking.openURL(`sms:${preferContacts[0].number}?body=messaggio predefinito`);
        console.log('soooooooooos')
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
                        {/* testo che informa su ciò che sta accadendo */}
                        <Text>STAI PER INVIARE UN S.O.S CONFERMA PER PROSEGUIRE</Text>
                        {/* qui metterò il pulsante conferma invio sos */}
                        <ButtonBox
                            label={'CONFERMA'}
                            callback={getSos}
                        />
                        {/* bottone per chiudere il modal */}
                        <ButtonBox
                            label={'CHIUDI'}
                            callback={MenageModal}
                        />
                    </View>
                </View>
            </Modal>
            <ButtonBox
                label={'LANCIA SOS'}
                callback={openModal}
            />
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

export default SosModal;