import React, { FC } from 'react'
import { useState, useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
// Storage
import { getData } from '../utils/storage';
// import la mappa
import MapView from 'react-native-maps';
// importo marker
import { Marker,PROVIDER_GOOGLE } from 'react-native-maps';

interface State {
    location: any;
    errorMsg?: any;
    latitude: number;
    longitude: number;
}

const initialState: State = {
    location: null,
    errorMsg: true,
    latitude: 	45.5809965,
    longitude: 9.4136515
}

type LocationType = {
    location:object | any,
    latitude:number | any,
    longitude:number | any,
    errorMsg:boolean
  }
  
  let locationData:LocationType = {
    location:  null,
    latitude: 45.5809965,
    longitude: 9.4136515,
    errorMsg:true
  }

const Maps: FC = () => {

    // inizializzo gli stati
    const [state, setState] = useState<State>(initialState)

    // useeffect che allo start dell'app manda la funzione 
    useEffect(() => {
        getLocationData()
        getLocation()
    }, []);

    const getLocationData = async () => {
        locationData = await getData('locationData')
    }
    //creo la funzione asyncrona per estrapolare la localizzazione 
    const getLocation = async () => {
        setState({
            ...state,
            location: locationData.location,
            latitude:locationData.latitude,
            longitude:locationData.longitude,
            errorMsg:locationData.errorMsg
        })
    }

    return (
        <View style={styles.container}>
            <MapView  style={styles.map}
                provider={PROVIDER_GOOGLE}
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
        flexDirection:'row',
        justifyContent:'center'
    },
    map: {
        width: '80%',
        height: '100%'
    }
});

export default Maps