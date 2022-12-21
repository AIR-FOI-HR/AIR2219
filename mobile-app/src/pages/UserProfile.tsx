import { StyleSheet, Text, View, Button } from "react-native";
import Logo from '../assets/ic_Logo.svg';
import { color } from "../lib/style/theme";
import TitleCurve from '../assets/vec_TitleCurve.svg';
import PurchaseHistory from "./PurchaseHistory";
import PastOrder from "../components/PastOrder";
import { Restroom } from "../api/models/response/Restroom";
import SimpleButton from "../components/SimpleButton";
import Title from "../components/Title";
import ProfileIcon from '../assets/ic_EditProfile.svg'
import PurchasesIcon from '../assets/ic_PurchasesBasket.svg'
import LogOutIcon from '../assets/ic_LogOut.svg';

const UserProfileScreen : React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Logo width={130} height={130}/>
        <Text>-- TO DO -- V E R S I O N</Text>

        <View style={styles.titleCurve}><TitleCurve/></View>

      </View>

      <View style={styles.buttonContainer}>
        <View>
          <SimpleButton text='Edit profile' onPress={()=>{}} svgImage={<ProfileIcon/>} width={300}/>
          <SimpleButton text='Purchase history' onPress={()=>navigation.navigate('purchaseHistory')} svgImage={<PurchasesIcon/>} width={300}/>
        </View>
        
        <SimpleButton text='Log Out' onPress={()=>{}} svgImage={<LogOutIcon/>} width={200} textColor={color.primaryBlue} buttonColor={color.white}/>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "flex-start",
    padding:30,
    height:'100%',
  },
  itemContainer:{
    alignItems: "center",
    justifyContent: 'space-between',
  },
  titleCurve:{
    margin:40,
  },
  buttonContainer:{
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
  }

});

export default UserProfileScreen;
