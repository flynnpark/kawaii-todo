import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Platform,
    ScrollView
} from 'react-native';
import { AppLoading } from "expo";
import ToDo from "./ToDo";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
    state = {
        newToDo: "",
        loadedToDos: false
    };

    componentDidMount = () => {
        this._loadToDos();
    };

    render() {
        const { newToDo, loadedToDos } = this.state;
        if (!loadedToDos) {
            return <AppLoading />
        }
        return (<View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Text style={styles.title}>Kawaii To Do</Text>
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder={"New To Do"}
                    value={newToDo}
                    onChangeText={this._controlNewToDo}
                    placeholderTextColor={"#999"}
                    underlineColorAndroid={"transparent"}
                    autoCorrect={false}
                />
                <ScrollView contentContainerStyle={styles.toDos}>
                    <ToDo text={"Hello I'm a To Do"}/>
                </ScrollView>
            </View>
        </View>);
    }

    _controlNewToDo = text => {
        this.setState({
            newToDo: text
        });
    }

    _loadToDos = () => {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f23657",
        alignItems: "center",
    },
    title: {
        color: "#fff",
        fontSize: 30,
        marginTop: 50,
        marginBottom: 30,
        fontWeight: "400"
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
            },
            android: {
                elevation: 3
            }
        })
    },
    input: {
        padding: 20,
        borderBottomColor: "#bbb",
        borderBottomWidth: 1,
        fontSize: 25
    },
    toDos: {
        alignItems: "center"
    }
});
