import React, { FC } from 'react'
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
// importo il location
import * as Location from 'expo-location';
// import la mappa
import MapView from 'react-native-maps';
// importo marker
import { Marker } from 'react-native-maps';

interface State {
    location: any;
    errorMsg?: any;
    latitude: number;
    longitude: number;
}

const initialState: State = {
    location: null,
    errorMsg: null,
    latitude: 	45.5809965,
    longitude: 9.4136515
}

const Maps: FC = () => {

    // inizializzo gli stati
    const [state, setState] = useState<State>(initialState)

    // useeffect che allo start dell'app manda la funzione 
    useEffect(() => {
        getLocation()
    }, []);

    //creo la funzione asyncrona per estrapolare la localizzazione 
    const getLocation = async (): Promise<void> => {
        // inserisco in una variabile la risposta positiva o negativa riguardo al permesso
        let { status } = await Location.requestForegroundPermissionsAsync()
        // controllo che sia stato dato il permesso e nel caso negativo fermo tutto 
        if (status !== 'granted') {
            console.log('qui ci arrivi')
            setState({
                ...state,
                errorMsg: 'Permission to access location was denied'
            });
            return;
        }
        // ottengo la locazione corretta 
        let locationNow = await Location.getCurrentPositionAsync({});
        setState({
            ...state,
            location: locationNow,
            latitude:locationNow.coords.latitude,
            longitude:locationNow.coords.longitude
        })
    }
    // display della location
    let text = 'Waiting..';
    if (state.errorMsg) {
        text = state.errorMsg;
    } else if (state.location) {
        text = JSON.stringify(state.location);
    }

    return (
        <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={{
                    latitude: state.latitude,
                    longitude: state.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}>
                <Marker
                    key={'io'}
                    coordinate={{ latitude: state.latitude, longitude: state.longitude }}
                    title={'io'}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: '100%',
    }
});

export default Maps