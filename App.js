import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  Pressable,
  Alert
} from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';

const _WIDTH = Dimensions.get("screen").width

export default function App() {

  const [name, setName] = useState("...")
  const stripe = useStripe()

  const handleInput = (value) => {
    setName(value)
  }

  const subscribe = async () => {
    try {
      const response = await fetch("http://192.168.68.109:8000/pay", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log(response)
      const data = await response.json()
      if (!response.ok) return Alert.alert(data.message)
      const clientSecret = data.clientSecret
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "NGUYENCONGDANH",
      })
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Payment complete, thank you!");
    } catch (error) {
      console.error(error);
      Alert.alert("Something went wrong, try again later!");
    }
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <StripeProvider publishableKey='pk_test_51OXPOpG9ArmG5WJRfju1dYkBeVXkQzUcB6sCQ6oIz5UAIgkEGZblkhFSIl75zlMqO3uT6gbNHKtr1LPGuyuM6QVR00K7wXoPB8'>

        <View
          style={{
            width: 0.9 * _WIDTH,
            aspectRatio: 1.5,
            backgroundColor: "orange",
            borderRadius: 10,
            overflow: "hidden"
          }}>
          <Image source={require("./background.jpg")} style={{
            width: "100%",
            height: "100%",
            objectFit: "fill",
          }} />

          <View style={{
            position: "absolute",
            top: 0,
            right: 10,
            flexDirection: "row",
            alignItems: "center"
          }}>
            <Image source={require("./logo.png")} style={{ width: 80, height: 80, objectFit: "cover" }} />
            <Text style={{
              color: "#1a048a",
              fontWeight: "bold",
              fontSize: 28,
            }}>DANH'S BANK</Text>

          </View>

          <View style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            padding: 15
          }}>
            <Text style={{
              marginBottom: 10,
              fontSize: 22,
              fontWeight: "bold"
            }}>**** **** **** ****</Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: "500"
              }}>{name}</Text>
              <Image source={require('./visapicture.png')} style={{ width: 80, height: 40, objectFit: "fill" }} />
            </View>
          </View>
        </View >

        <View style={{
          flexDirection: 'row',
          alignItems: "center",
          gap: 10,
          marginTop: 30
        }}>
          <TextInput
            placeholder='Account Number'
            onChangeText={(val) => handleInput(val)}
            value={name}
            style={{
              width: _WIDTH * 0.6,
              borderWidth: 1,
              borderColor: "black",
              alignItems: 'center',
              paddingVertical: 5,
              paddingHorizontal: 10
            }}
          />
          <Pressable
            onPress={() => subscribe()}
            style={{
              padding: 10,
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#1a048a"
            }}>
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontWeight: "600"
            }}>Subscribe </Text>
          </Pressable>
        </View>
      </StripeProvider>

    </View>
  );
}

