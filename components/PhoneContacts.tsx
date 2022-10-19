import { FC, useEffect, useState } from "react"
import { Text, View } from 'react-native';
// storage
import { getData, storeData } from "../utils/storage";
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ModalBoxSearch from "./ModalBoxSearch";
import ButtonBox from "./ButtonBox";
// translate
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';


// traduzioni
const translations = {
    en: {
        title: 'YOUR FAVORITE CONTACTS',
        description: 'You can have a maximum of 5 contacts'
    },
    it: {
        title: 'I TUOI CONTATTI PREFERITI',
        description: 'Puoi avere un massimo di 5 contatti'
    }
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true;

type PhoneContactsType = {
    name: string,
    number: string
}

// stati
interface State {
    contacts: Array<PhoneContactsType>
}
const initialState: State = {
    contacts: []
}


const PhoneContacts: FC = () => {

    // state
    const [state, setState] = useState<State>(initialState)

    // use effect per popolare l'array di contatti preferiti
    useEffect(() => {
        getDataContacts()
    }, [state.contacts])
    // funzione per chiamare lo storage dei contatti
    const getDataContacts = async () => {
        let contactsData = await getData('preferContacts')
        setState({
            ...state,
            contacts: contactsData
        })
    }
    // funzione per eliminare i preferiti
    const removePrefer = (nome: string) => () => {
        // estrapolo i contatti e li metto nell'array da filtrare
        let arrayForRemovePrefer = state.contacts.filter((contact) => {
            return (
                !contact.name.includes(nome)
            )
        })
        console.log('rimosso', arrayForRemovePrefer)
        storeData(arrayForRemovePrefer, 'preferContacts')
    }

    return (
        <View style={[CommonStyles.fullScreenSize, CommonStyles.genericContainer, CommonStyles.paddingContainer2]}>
            <Text style={[CommonStyles.boldFont,CommonStyles.textCenter, CommonStyles.branColorText, CommonStyles.normalTextSize]}>
                {i18n.t('title')}
            </Text>
            <Text style={[CommonStyles.textCenter, CommonStyles.trdText, CommonStyles.paddingBottom, CommonStyles.smallText]}>
                {i18n.t('description')}
            </Text>
            <View style={[CommonStyles.row, CommonStyles.centerHorizontal]}>
                <ModalBoxSearch
                />
                {
                    state.contacts.map((contacts, index) => {
                        return (
                            <View style={[CommonStyles.column, { width: 60 }]} key={index}>
                                <ButtonBox
                                    label={'-'}
                                    callback={removePrefer(contacts.name)}
                                    buttonContainerStyle={[CommonStyles.contacts, CommonStyles.brandColorBg, CommonStyles.centerItems]}
                                    buttonTextStyle={[CommonStyles.boldFont, CommonStyles.secondaryColorText, { fontSize: 25 }]}
                                />
                                <Text style={[CommonStyles.smallText, CommonStyles.trdText]}>
                                    {contacts.name}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default PhoneContacts