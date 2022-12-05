import { StyleSheet, Text, View } from 'react-native';

const ScannerScreen: React.FC = () => {
    return (
      <View style={styles.container}>
        <Text>Scanner</Text>
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