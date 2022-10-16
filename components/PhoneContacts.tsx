import { FC,useEffect,useState} from "react"
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// storage
import { getData,storeData } from "../utils/storage";
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ModalBoxSearch from "./ModalBoxSearch";
import ButtonBox from "./ButtonBox";

type PhoneContactsType = {
    name:string,
    number:string
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
    const [ state, setState ] = useState<State>(initialState)

    // use effect per popolare l'array di contatti preferiti
    useEffect(() => {
        getDataContacts()
    },[state.contacts])
    // funzione per chiamare lo storage dei contatti
    const getDataContacts = async () => {
        let contactsData = await getData('preferContacts')
        setState({
            ...state,
            contacts:contactsData
        })
    }
    // funzione per eliminare i preferiti
    const removePrefer = (nome:string) => () => {
        // estrapolo i contatti e li metto nell'array da filtrare
        let arrayForRemovePrefer = state.contacts.filter((contact) => {
            return(
                !contact.name.includes(nome)
            )
        })
        console.log('rimosso',arrayForRemovePrefer)
        storeData(arrayForRemovePrefer,'preferContacts')
    }

    return (
        <View style={[CommonStyles.fullScreenSize, CommonStyles.genericContainer,CommonStyles.paddingContainer]}>
            <Text style={[CommonStyles.boldFont,CommonStyles.branColorText,CommonStyles.normalTextSize]}>
                I TUOI CONTATTI PREFERITI
            </Text>
            <View style={[CommonStyles.row]}>
                <ModalBoxSearch
                />
                {
                    state.contacts.map((contacts,index) => {
                        return(
                            <View style={[CommonStyles.column,{width:70}]} key={index}>
                                <ButtonBox
                                label={'-'}
                                callback={removePrefer(contacts.name)}
                                buttonContainerStyle={[CommonStyles.contacts,CommonStyles.brandColorBg,CommonStyles.centerItems]}
                                buttonTextStyle={[CommonStyles.boldFont,CommonStyles.secondaryColorText,{fontSize:30}]}
                                />
                                <Text> 
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