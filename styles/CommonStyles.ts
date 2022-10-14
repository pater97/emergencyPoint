import { StyleSheet,Dimensions } from "react-native";

export default StyleSheet.create({
    genericContainer:{
        flex:1
    },
    container2:{
        flex:2
    },
    container3:{
        flex:3
    },
    column:{
        flexDirection:'column'
    },
    fullScreenSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    centerItems:{
        justifyContent:"center",
        alignItems:"center"
    },
    centerVertical:{
        alignItems:'center'
    },
    centerHorizontal:{
        justifyContent:'center'
    },
    paddingContainer:{
        paddingVertical:50,
        paddingHorizontal:6
    },
    secondaryBg:{
        backgroundColor: '#EDF2F4'
    },
    brandColorBg: {
        backgroundColor:'#EF233C',
    },
    branColorText:{
        color:'#EF233C'
    },
    secondaryColorText:{
        color:'#EDF2F4'
    },
    titleFont:{
        fontSize:40,
        fontWeight:'bold',
    },
    whiteColor:{
        color:'#f6f6f6'
    },
    boldFont:{
        fontWeight:'bold'
    },
    halfWidth:{
        width:'50%'
    },
    normalTextSize:{
        fontSize:20
    },
    lineThrough:{
        textDecorationLine:'line-through'
    },
    buttonBox:{
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:10,
        margin:10
    },
    inputBox: {
        height: 40,
        width:300,
        margin: 12,
        borderWidth: .2,
        padding: 10,
        borderColor:'blueviolet'
    }
})