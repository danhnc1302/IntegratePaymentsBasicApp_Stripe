import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  Pressable
} from 'react-native';

const _WIDTH = Dimensions.get("screen").width

export default function App() {

  const [input, setInput] = useState("...")

  const handleInput = (value) => {
    if (value.length === 0) {
      setInput("");
      return;
    }
    const newString = value.replace(/([^ ]{4}(?=[^ ]|$))/g, '$1 ');
    setInput(newString.trim());
  }


  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
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
          }}>{input}</Text>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "500"
            }}>NGUYEN CONG DANH</Text>
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
          value={input}
          style={{
            width: _WIDTH * 0.6,
            borderWidth: 1,
            borderColor: "black",
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 10
          }}
        />
        <Pressable style={{
          width: 60,
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
          }}>Pay</Text>
        </Pressable>
      </View>

    </View>
  );
}
