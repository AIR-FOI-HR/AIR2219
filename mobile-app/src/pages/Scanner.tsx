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

const ScannerScreen: React.FC = () => {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [dataQR, setDataQR] = useState("");

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

  const handleBarCodeScanned = ({ data }: Props) => {
    setScanned(true);
    setDataQR(data);
  };

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
                    <Text style={styles.blackText}>Skenirana brava</Text>
                    <Text style={styles.blueText}>
                      Ul. Vladimira Nazora 17, 42000 Varaždin
                    </Text>
                  </View>
                  <View style={styles.infoContainerChild}>
                    <Text style={styles.blackText}>Cijena</Text>
                    <Text style={styles.orangeText}>3,00 HRK</Text>
                  </View>
                  <Text style={styles.blackText}>
                    Želite li platiti ulazak?
                  </Text>
                </View>
                {/* <Text>{dataQR}</Text> */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmText}>Potvrdi</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setScanned(false)}
                  >
                    <Text style={styles.cancelText}>Odustani</Text>
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
