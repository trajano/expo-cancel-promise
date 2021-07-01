import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const Blah = () => {
  const [ val, setVal ] = useState(0);
  useEffect( () => { 
    const x = setTimeout(() => { setVal(1) }, 1000)
    return () => clearTimeout(x)
  }, [])
  return (
    <Text style={styles.blah}>Val = {val}</Text>
  )
}
export default function TabOneScreen() {
  const [showBlah, setShowBlah] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Pressable onPress={()=>{setShowBlah(!showBlah)}}>
        <Text style={styles.button}>Toggle</Text>
      </Pressable>
      {showBlah  && (<Blah />)}
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    padding: 10,
    borderWidth: 1,
  },
  blah: {
    fontSize: 20
  }
});
