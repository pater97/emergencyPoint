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
    row:{
        display:'flex',
        flexDirection:'row'
    },
    spaceAround:{
        justifyContent:"space-around"
    },
    rowHeader:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    fullScreenSize: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    centerItems:{
        display:'flex',
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
        paddingVertical:30,
        paddingHorizontal:6
    },
    paddingBottom:{
        paddingBottom:15
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
    textCenter:{
        textAlign:"center"
    },
    lineThrough:{
        textDecorationLine:'line-through'
    },
    marginRigth:{
        marginRight:20
    },
    paddingHeader:{
        paddingHorizontal:3,
        paddingVertical:5
    },
    buttonBoxHeader:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    inputBox: {
        height: 40,
        width:300,
        margin: 12,
        borderWidth: .2,
        padding: 10,
        borderColor:'blueviolet'
    },
    buttonSos:{
        height:200,
        width:200,
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
        borderRadius:200
    },
    sosText:{
        fontSize:70
    },
    contacts:{
        height:40,
        width:40,
        borderRadius:40
    }
})