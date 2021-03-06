import React from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';

export default class InfoScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

    constructor() {
        super();
        this.state = {
            name: ''
        };
        this._bootstrap();
    }

    _bootstrap = async () => {
        const userName = await AsyncStorage.getItem('userName');
        this.setState({name: userName});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Page d'informations</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
