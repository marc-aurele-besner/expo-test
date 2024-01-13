import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const test = async () => {
    console.log('test')
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin", {
      method: "GET",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    },).then((result) => {
      console.error('Response Status:', result.status);
      console.error('Response Headers:', result.headers);
      return result.json();
    }).then((json) => {
      console.error('JSON Response:', json);
    }).catch((error) => {
      console.error('Fetch Error:', error);
    });
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Test" text= "Hello" onPress={test} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
