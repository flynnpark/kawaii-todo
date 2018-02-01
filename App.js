import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.title}>Kawaii To Do</Text>
          <View style={styles.card}>
              <TextInput style={styles.input} placeholder={"New To Do"}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      color: "#fff",
      fontSize: 30,
      marginTop: 50,
      marginBottom: 30,
      fontWeight: "400",
  },
  card: {
      backgroundColor: "#fff",
      flex: 1,
      width: width - 30,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      ...Platform.select({
          ios: {
              shadowColor: "rgb(50, 50, 50)",
              shadowOpacity: 0.5,
              shadowRadius: 5,
              shadowOffset: {
                  height: -1,
                  width: 0
              }
          }
      }, {
          android: {
              elevation: 3
          }
      })
  }
});
