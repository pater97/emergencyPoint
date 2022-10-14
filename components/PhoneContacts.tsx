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
        <View style={[CommonStyles.fullScreenSize, CommonStyles.genericContainer]}>
            <Text>
                CONTACTS
            </Text>
            {
                state.contacts.map((contacts,index) => {
                    return(
                        <View key={index}>
                            <Text> 
                                {contacts.name}
                            </Text>
                            <ButtonBox
                            label={'remove'}
                            callback={removePrefer(contacts.name)}
                            />
                        </View>
                    )
                })
            }
            <ModalBoxSearch
            />
        </View>
    )
}

export default PhoneContacts