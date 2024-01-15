import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import "@ethersproject/shims"
import { Contract, Wallet, providers } from 'ethers'
import * as Counter from './assets/Counter.json'

export default function App() {
  const testFetch = async () => {
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
  
  const provider = new providers.JsonRpcProvider(process.env.EXPO_PUBLIC_RPC_URL)
  const signer = new Wallet(process.env.EXPO_PUBLIC_PRIVATE_KEY, provider)
  const counter = new Contract(process.env.EXPO_PUBLIC_COUNTER_CONTRACT_ADDRESS, Counter.abi, signer)

  const [currentNumber, setCurrentNumber] = useState('')
  const [lastTxHash, setLastTxHash] = useState('')

  const getCounter = useCallback(async () => {
    try {
      const number = await counter.number()
      setCurrentNumber(number.toString())
      console.log('number', number)
    } catch (error) {
      console.error('error', error)
    }
  }, [counter, setCurrentNumber])

  const setCounter = useCallback(async () => {
    try {
      setLastTxHash('sending...')
      const tx = await counter.setNumber(process.env.EXPO_PUBLIC_NUMBER_TO_SET)
      setLastTxHash(tx.hash)
      console.log('tx', tx)
    } catch (error) {
      console.error('error', error)
    }
  }, [counter, setLastTxHash])

  const incrementCounter = useCallback(async () => {
    try {
      setLastTxHash('sending...')
      const tx = await counter.increment()
      setLastTxHash(tx.hash)
      console.log('tx', tx)
    } catch (error) {
      console.error('error', error)
    }
  }, [counter, setLastTxHash])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Test Fetch" text= "Test Fetch" onPress={testFetch} />
      <Button title="Set Counter" text= "Set Counter" onPress={setCounter} />
      <Button title="Get Counter" text= "Get Counter" onPress={getCounter} />
      <Button title="Increment Counter" text= "Increment Counter" onPress={incrementCounter} />
      <Text>Current Number: {currentNumber}</Text>
      <Text>Last Tx Hash: {lastTxHash}</Text>
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
