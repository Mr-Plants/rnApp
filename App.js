/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, FlatList} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const REQUEST_URL = "./data.json";

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount(): void {
        this.fetchData()
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoading()
        }
        return (
            <FlatList
                data={this.state.data}
                renderItem={this.renderMovie}
                style={styles.list}
                keyExtractor={item => item.id}
            />
        )


    }

    renderLoading() {
        return (
            <View style={styles.container}>
                <Text>Loading movies...</Text>
            </View>
        );
    }

    renderMovie({item}) {
        return (
            <View style={styles.container}>
                <Image source={{uri: item.posters.thumbnail}} style={styles.thumbnail}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.year}>{item.year}</Text>
                </View>

            </View>
        );
    }

    fetchData = () => {
        fetch('https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: this.state.data.concat(res.movies),
                    loaded: true
                })
            })

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "center"
    },
    year: {
        textAlign: "center"
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    list: {
        paddingTop: 20,
        backgroundColor: "#F5FCFF"
    }
})
