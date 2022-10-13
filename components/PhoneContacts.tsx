import { FC,useEffect} from "react"
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
// storage
import { getData } from "../utils/storage";
// stile
import CommonStyles from "../styles/CommonStyles";
// components
import ButtonBox from "../components/ButtonBox";

type PhoneContactsType = {
    name:string,
    number:string
}

let contacts:Array<PhoneContactsType> = []

const PhoneContacts: FC = () => {

    // use effect per popolare l'array di contatti
    useEffect(() => {
        getDataContacts()
    })
    // funzione per chiamare lo storage dei contatti
    const getDataContacts = async () => {
        contacts = await getData('contacts')
        console.log(contacts)
    }

    return (
        <View style={[CommonStyles.fullScreenSize, CommonStyles.genericContainer]}>
            <Text>
                CONTACTS
            </Text>
        </View>
    )
}

export default PhoneContacts