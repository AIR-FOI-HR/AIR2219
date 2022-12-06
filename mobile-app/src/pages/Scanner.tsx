import { Button, StyleSheet, Text, View } from 'react-native';

const ScannerScreen: React.FC = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Scanner</Text>
        <Button title='Go to Payment' onPress={() => navigation.navigate("payment")}></Button>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default ScannerScreen;