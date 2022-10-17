import React, { FC, useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, ScrollView, View, Linking } from 'react-native';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

// storage
import { getData } from '../utils/storage';
// styles
import CommonStyles from '../styles/CommonStyles';
// components
import ButtonBox from './ButtonBox';


// traduzioni
const translations = {
    en: {
        aid: 'QUICKLY CONTACT THE AID',
        otherwise: 'otherwise',
        caption: 'SEND YOUR S.O.S TO ONE OF YOUR FAVORITE CONTACTS WITH THE METHOD YOU PREFER'
    },
    it: {
        aid: 'CONTATTA RAPIDAMENTE I SOCCORSI',
        otherwise: 'ALTRIMENTI',
        caption: 'INVIA IL TUO S.O.S A UNO DEI TUOI CONTATTI PREFERITI CON IL METODO CHE PREFERISCI'
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

type LocationType = {
    location: object | any,
    latitude: number | any,
    longitude: number | any,
    errorMsg: boolean
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

let locationData: LocationType = {
    location: null,
    latitude: 45.5809965,
    longitude: 9.4136515,
    errorMsg: true
}
// array che contiene i 5 contatti preferiti
let preferContacts: Array<PhoneContactsType> = []

const SosModal: FC = () => {

    const [state, setState] = useState<State>(initialState)

    // // use effect per popolare l'array di contatti
    useEffect(() => {
        getDataContacts()
    }, [])

    // funzione per chiamare lo storage dei contatti
    const getDataContacts = async () => {
        preferContacts = await getData('preferContacts')
        locationData = await getData('locationData')
        setState({
            ...state,
            contacts: preferContacts
        })
    }
    // soswp
    const getSosWp = (number: string) => () => {
        Linking.openURL(`https://wa.me/:${number}?text=Sono in uno stato di emergenza, mi trovo ella seguente posizione: latitudine ${locationData.latitude}, longitudine: ${locationData.longitude}`);
    }
    // sosSms
    const getSosSms = (number: string) => () => {
        Linking.openURL(`sms:${number}?body=Sono in uno stato di emergenza, mi trovo ella seguente posizione: latitudine ${locationData.latitude}, longitudine: ${locationData.longitude}`);
    }
    // sosCall
    const getSosCall = (number: string) => () => {
        Linking.openURL(`tel:${number}`);
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
                        <Text style={[CommonStyles.titleFont, CommonStyles.branColorText, CommonStyles.textCenter, CommonStyles.paddingBottom]}>
                            S.O.S
                        </Text>
                        <View style={CommonStyles.genericContainer}>
                            <Text style={[CommonStyles.normalTextSize, CommonStyles.paddingBottom, CommonStyles.textCenter, CommonStyles.underline, CommonStyles.boldFont]}>
                                {i18n.t('aid')}
                            </Text>
                            <ButtonBox
                                label={'112'}
                                callback={getSosCall('112')}
                                buttonContainerStyle={[CommonStyles.squareButton, CommonStyles.brandColorBg, CommonStyles.centerItems]}
                                buttonTextStyle={[CommonStyles.secondaryColorText, CommonStyles.boldFont, CommonStyles.normalTextSize]}
                            />
                            <Text style={[CommonStyles.branColorText, CommonStyles.textCenter, CommonStyles.smallText, { marginVertical: 5 }]}>
                                {i18n.t('otherwise')}
                            </Text>
                        </View>
                        <View style={CommonStyles.container3}>
                            {/* testo che informa su ciò che sta accadendo */}
                            <Text style={[CommonStyles.smallText, CommonStyles.textCenter, CommonStyles.trdText]}>
                                {i18n.t('caption')}
                            </Text>
                            {/* qui metterò il pulsante conferma invio sos */}
                            <ScrollView style={[CommonStyles.genericContainer, CommonStyles.marginY]}>
                                {
                                    state.contacts.map((contact, index) => {
                                        return (
                                            <View style={[CommonStyles.paddingY]} key={index}>
                                                <Text style={[CommonStyles.paddingBottom, CommonStyles.boldFont, CommonStyles.textMaiusc, CommonStyles.normalTextSize, CommonStyles.textCenter]}>
                                                    {contact.name}
                                                </Text>
                                                <View style={[CommonStyles.row, CommonStyles.spaceAround]}>
                                                    <ButtonBox
                                                        label={'WP'}
                                                        callback={getSosWp(contact.number)}
                                                        buttonContainerStyle={[CommonStyles.contacts, CommonStyles.wpButton, CommonStyles.centerItems]}
                                                        buttonTextStyle={[CommonStyles.secondaryColorText, CommonStyles.boldFont]}
                                                    />
                                                    <ButtonBox
                                                        label={'SMS'}
                                                        callback={getSosSms(contact.number)}
                                                        buttonContainerStyle={[CommonStyles.contacts, CommonStyles.trdBg, CommonStyles.centerItems]}
                                                        buttonTextStyle={[CommonStyles.secondaryColorText, CommonStyles.boldFont]}
                                                    />
                                                    <ButtonBox
                                                        label={'TEL'}
                                                        callback={getSosCall(contact.number)}
                                                        buttonContainerStyle={[CommonStyles.contacts, CommonStyles.brandColorBg, CommonStyles.centerItems]}
                                                        buttonTextStyle={[CommonStyles.secondaryColorText, CommonStyles.boldFont]}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                        <View style={CommonStyles.centerItems}>
                            {/* bottone per chiudere il modal */}
                            <ButtonBox
                                label={'CHIUDI'}
                                callback={MenageModal}
                                buttonTextStyle={[CommonStyles.boldFont, CommonStyles.underline, CommonStyles.normalTextSize, CommonStyles.branColorText]}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={[CommonStyles.centerItems, { height: 130 }]}>
                <ButtonBox
                    label={'LANCIA S.O.S'}
                    callback={openModal}
                    buttonContainerStyle={[CommonStyles.squareButton, CommonStyles.brandColorBg]}
                    buttonTextStyle={[CommonStyles.normalTextSize, CommonStyles.boldFont, CommonStyles.secondaryColorText]}
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
    }
});

export default SosModal;