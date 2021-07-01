import * as React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

function useAsyncStateChangeEffect<T>(
  asyncFunction: () => Promise<T>,
  setStatesFunction: (asyncResult: T) => void,
  deps: React.DependencyList
) {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    (async () => {
      const x = await asyncFunction();
      if (mountedRef.current) {
        setStatesFunction(x);
      }
    })();
    return () => {
      mountedRef.current = false;
    };
  }, deps);
}

const sleep = async (seconds: number) =>
  new Promise<void>((r) => setTimeout(() => r(), seconds * 1000));

const Blah = () => {
  const [val, setVal] = useState(0);
  // useEffect( () => {
  //   const x = setTimeout(() => { setVal(1) }, 1000)
  //   return () => clearTimeout(x)
  // }, [])
  console.log("Render");
  useAsyncStateChangeEffect(
    async () => {
      console.log(1);
      await sleep(1);
      console.log(2);
      await sleep(1);
      console.log(3);
      await sleep(1);
      console.log(4);
      return Date.now();
    },
    (now) => {
      setVal(now);
    },
    []
  );
  return <Text style={styles.blah}>Val2 = {val}</Text>;
};
export default function TabOneScreen() {
  const [showBlah, setShowBlah] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Pressable
        onPress={() => {
          setShowBlah(!showBlah);
        }}
      >
        <Text style={styles.button}>Toggle</Text>
      </Pressable>
      {showBlah && <Blah />}
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    padding: 10,
    borderWidth: 1,
  },
  blah: {
    fontSize: 20,
  },
});
