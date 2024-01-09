import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { CreditCardInput } from "react-native-credit-card-input";

export default function App() {

  const [CardInput, setCardInput] = useState({})

  const _onChange = (data) => {
    setCardInput(data)
  }


  const onSubmit = () => {
    if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
      Alert.alert("Invalid Credit Card")
      return false
    }

  }



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2471A3" />
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Stripe_logo%2C_revised_2016.png/1200px-Stripe_logo%2C_revised_2016.png' }}
        style={styles.ImgStyle}
      />
      <CreditCardInput
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        validColor="#fff"
        placeholderColor="#ccc"
        onChange={_onChange} />

      <TouchableOpacity
        onPress={onSubmit}
        style={styles.button}>
        <Text
          style={styles.buttonText}>
          Pay Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  ImgStyle: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2471A3',
    width: 150,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 15,
    color: '#f4f4f4',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  inputContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: 5
  },
  inputStyle: {
    backgroundColor: '#222242',
    paddingLeft: 15,
    borderRadius: 5,
    color: '#fff'
  },
  labelStyle: {
    marginBottom: 5,
    fontSize: 12
  }

});

