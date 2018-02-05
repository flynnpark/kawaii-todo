import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    Dimensions,
    Platform,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { AppLoading } from "expo";
import ToDo from "./ToDo";
import uuidv1 from "uuid/v1";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
    state = {
        newToDo: "",
        loadedToDos: false,
        toDos: {}
    };

    componentDidMount = () => {
        this._loadToDos();
    };

    render() {
        const { newToDo, loadedToDos, toDos } = this.state;
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
                    onSubmitEditing={this._addToDo}
                />
                <ScrollView contentContainerStyle={styles.toDos}>
                    {Object.values(toDos).reverse().map(toDo => (
                        <ToDo
                            key={toDo.id}
                            completeToDo={this._completeToDo}
                            uncompletedToDo={this._uncompleteToDo}
                            deleteToDo={this._deleteToDo}
                            {...toDo}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>);
    }

    _controlNewToDo = text => {
        this.setState({
            newToDo: text
        });
    }

    _loadToDos = async () => {
        try {
            const toDos = await AsyncStorage.getItem("toDos");
            const parsedToDos = JSON.parse(toDos);
            this.setState({
                loadedToDos: true,
                toDos: parsedToDos || {}
            });
        } catch(err) {
            console.log(err);
        }
    }

    _addToDo = () => {
        const { newToDo } = this.state;
        if (newToDo !== "") {
            this.setState(prevState => {
                const ID = uuidv1();
                const newToDoObject = {
                    [ID]: {
                        id: ID,
                        isCompleted: false,
                        text: newToDo,
                        createdAt: Date.now()
                    }
                };
                const newState = {
                    ...prevState,
                    newToDo: "",
                    toDos: {
                        ...prevState.toDos,
                        ...newToDoObject
                    }
                };
                this._saveToDos(newState.toDos);
                return { ...newState };
            });
        }
    }

    _deleteToDo = id => {
        this.setState(prevState => {
            const toDos = prevState.toDos;
            delete toDos[id];
            const newState = {
                ...prevState,
                ...toDos
            };
            this._saveToDos(newState.toDos);
            return { ...newState };
        });
    }

    _uncompleteToDo = id => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: false
                    }
                }
            };
            this._saveToDos(newState.toDos);
            return { ...newState };
        });
    }

    _completeToDo = id => {
        this.setState(prevState => {
            const newState = {
                ...prevState,
                toDos: {
                    ...prevState.toDos,
                    [id]: {
                        ...prevState.toDos[id],
                        isCompleted: true
                    }
                }
            };
            this._saveToDos(newState.toDos);
            return { ...newState };
        });
    }

    _saveToDos = newToDos => {
        const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
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
