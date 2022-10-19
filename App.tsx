// rn cmponent
import { SafeAreaView, StatusBar} from 'react-native';
// react 
import { useEffect} from "react"
// style
import CommonStyles from './styles/CommonStyles';
// navigazione
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// storage
import { storeData } from './utils/storage';
// IMPORT contacts function
import * as Contacts from 'expo-contacts';
// import location function
// importo il location
import * as Location from 'expo-location';
// screen
import Home from './screens/Home';
import Emergency from './screens/Emergency';

// crate navigation
const Stack = createNativeStackNavigator();

// typo dello storage per la locazione
type LocationType = {
  location:object | null,
  latitude:number | null,
  longitude:number | null,
  errorMsg:boolean 
}
// array per il salvataggio della locazione
let locationData:LocationType = {
  location:  null,
  latitude: null,
  longitude: null,
  errorMsg:true
}

export default function App() {

  // useEffect per richiamare la funzione
  useEffect(() => {
    // ottengo e salvo i dati
    getContact()
    getLocation()
  }, [])





  // funzione asyncrona per chidere il permesso e avere i numeri di telefono
  const getContact = async ():Promise<any> => {
    const contacts: Array<object> = []
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {

        // pulisco l'array di contatti con solo contatti che hanno il numero (filter)
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

   //creo la funzione asyncrona per estrapolare la localizzazione 
   const getLocation = async (): Promise<void> => {
    // inserisco in una variabile la risposta positiva o negativa riguardo al permesso
    let { status } = await Location.requestForegroundPermissionsAsync()
    // controllo che sia stato dato il permesso e nel caso negativo fermo tutto 
    if (status !== 'granted') {
        console.log('non abilitato')
        locationData.errorMsg = true
        return;
    }
    // ottengo la locazione corretta 
    let locationNow = await Location.getCurrentPositionAsync({});
    // costruisco l'oggetto
    locationData.location = locationNow;
    locationData.latitude = locationNow.coords.latitude;
    locationData.longitude = locationNow.coords.longitude;
    locationData.errorMsg = false
    console.log('app locationdata',locationData)
    // salvo in storage
    storeData(locationData,'locationData')
}

  return (
    <SafeAreaView style={CommonStyles.genericContainer}>
      <StatusBar backgroundColor={'#EF233C'}/>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Emergency" component={Emergency} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
