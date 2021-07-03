import * as React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

/**
 * This starts an async function and executes another function that performs
 * React state changes if the component is still mounted after the async
 * operation completes
 * @param asyncFn async function that will be executed
 * @param onSuccess this gets executed after async function is resolved and
 *  the component is still mounted the result of the async function is passed
 *  in as the parameter
 * @param deps dependencies, asyncFn and onSuccess are added in by default.
 */
function useAsync<T>(
  asyncFn: (moutedRef: React.MutableRefObject<boolean>) => Promise<T>,
  onSuccess: (asyncResult: T) => void,
  deps: React.DependencyList
) {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    (async () => {
      const x = await asyncFn(mountedRef);
      if (mountedRef.current) {
        onSuccess(x);
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
  useAsync(
    async (mountedRef) => {
      console.log(1, mountedRef);
      await sleep(1);
      if (!mountedRef.current) {
        return;
      }
      console.log(2, mountedRef);
      await sleep(1);
      if (!mountedRef.current) {
        return;
      }
      console.log(3, mountedRef);
      await sleep(1);
      if (!mountedRef.current) {
        return;
      }
      console.log(4, mountedRef);
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
