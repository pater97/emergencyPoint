import { SafeAreaView, ScrollView, Text } from 'react-native';
import CommonStyles from './styles/CommonStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from "react"
import { storeData,getData } from './utils/storage';
// IMPORT contacts function
import * as Contacts from 'expo-contacts';
// screen
import Home from './screens/Home';
import Emergency from './screens/Emergency';

const Stack = createNativeStackNavigator();

export default function App() {

  // useEffect per richiamare la funzione
  useEffect(() => {
    getContact()
  }, [])


  // funzione asyncrona per chidere il permesso e avere i numeri di telefono
  const getContact = async () => {
    const contacts: Array<object> = []
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {

        data.map((element) => {
          if (!!element.phoneNumbers) {
            let dataName = element.name
            let dataNumber = element.phoneNumbers[0].number
            let contact:object = {
              name: dataName,
              number: dataNumber
            }
            contacts.push(contact)
          }
        });
      }
      storeData(contacts,'contacts')
    }
  }

  return (
    <SafeAreaView style={CommonStyles.genericContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Emergency" component={Emergency} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
