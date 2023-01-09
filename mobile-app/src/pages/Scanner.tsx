import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { color } from "../lib/style/theme";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import { getRestroomById } from "../api/restrooms";
import { Restroom } from "../api/models/response/Restroom";

interface Props{
  navigation:any;
}

const ScannerScreen: React.FC<Props> = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [dataQR, setDataQR] = useState<Restroom>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  interface Props {
    data: string;
  }

  const handleBarCodeScanned = async ({ data }: Props) => {
    setScanned(true);
    const restroom: Restroom = await getRestroomById(data);
    setDataQR(restroom);  
  };

  const handleConfirmation = () =>{
    setScanned(false);
    navigation.navigate('payment',dataQR);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject]}
      />
      {scanned && (
        <Modal transparent>
          <View style={styles.modalOpacity}>
            <View style={styles.modalOpacityChild}>
              <View style={styles.popUp}>
                <View style={styles.infoContainer}>
                  <View style={styles.infoContainerChild}>
                    <Text style={styles.blackText}>Scanner</Text>
                    <Text style={styles.blueText}>
                      {`${dataQR?.address}, ${dataQR?.cityCode} ${dataQR?.cityName}`}
                    </Text>
                  </View>
                  <View style={styles.infoContainerChild}>
                    <Text style={styles.blackText}>Price</Text>
                    <Text style={styles.orangeText}>{dataQR?.price} EUR</Text>
                  </View>
                  <Text style={styles.blackText}>
                    Proceed to payment?
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmation}>
                    <Text style={styles.confirmText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setScanned(false)}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.black,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOpacity: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalOpacityChild: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 281,
    height: 291,
    overflow: "hidden",
  },
  popUp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoContainerChild: {
    maxWidth: 250,
  },
  blackText: {
    color: color.black,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
  blueText: {
    color: color.primaryBlue,
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
  },
  orangeText: {
    color: color.primaryOrange,
    fontSize: 16,
    fontFamily: "OpenSans_600SemiBold",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 50,
    maxWidth: 300,
  },
  confirmText: {
    color: color.white,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  cancelText: {
    color: color.primaryBlue,
    fontSize: 14,
    fontFamily: "OpenSans_400Regular",
  },
  confirmButton: {
    backgroundColor: color.primaryBlue,
    borderTopColor: color.borderGrey,
    borderRightColor: color.borderGrey,
    borderTopWidth: 1,
    borderRightWidth: 1,
    width: 140,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: color.white,
    borderTopColor: color.borderGrey,
    borderLeftColor: color.borderGrey,
    borderTopWidth: 1,
    borderLefttWidth: 1,
    width: 140,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScannerScreen;
