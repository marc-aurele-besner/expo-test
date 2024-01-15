# Expo-Test

This is a simple Expo app test to reproduce and test web3 behavior on React Native.

## How to run

Install dependencies:

```bash
yarn
```

Copy the `.env.example` file to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Environment variables

| Variable | Description |
| --- | --- |
| `EXPO_PUBLIC_RPC_URL` | RPC URL of the EVM Blockchain |
| `EXPO_PUBLIC_COUNTER_CONTRACT_ADDRESS` | Counter contract address |
| `EXPO_PUBLIC_PRIVATE_KEY` | Signer private key to send transaction |
| `EXPO_PUBLIC_NUMBER_TO_SET` | Number that will be use by the Set Counter button |

Run the app:

```bash
yarn ios
```

## How to reproduce

Use the Set Counter button to set the counter, you will see the tx hash as soon as the transaction is sent.

Use the Get Counter button to get the counter value, you will see the counter value as soon as the transaction is mined.