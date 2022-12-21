import { StyleSheet, Text, View, Button } from "react-native";
import Logo from '../assets/ic_Logo.svg';
import { color } from "../lib/style/theme";
import TitleCurve from '../assets/vec_TitleCurve.svg';
import PurchaseHistory from "./PurchaseHistory";
import PastOrder from "../components/PastOrder";
import { Restroom } from "../api/models/response/Restroom";


const UserProfileScreen : React.FC = ({navigation}) => {
  return (
    // <View style={styles.container}>
    //   <View style={styles.itemContainer}>
    //     <Logo width={150} height={150}/>
    //     <Text>-- TO DO -- T I T L E</Text>
    //     <Text>-- TO DO -- V E R S I O N</Text>

    //     <View style={styles.titleCurve}><TitleCurve/></View>

    //   </View>

    //   <View>
    //     <Button title='Past purchases' onPress={navigation.navigate('')}/>
    //   </View>
      
    // </View>
    <View style={styles.container}>
      <Button title={'asdf'} onPress= {()=>{navigation.navigate('purchaseHistory')}}/>
    </View>

  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: color.white,
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   padding:30,
  //   height:'100%',
  // },
  // itemContainer:{
  //   alignItems: "center",
  //   justifyContent: 'space-between',
  // },
  // titleCurve:{
  //   margin:40,
  // }

  container:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,
  }
});

export default UserProfileScreen;
