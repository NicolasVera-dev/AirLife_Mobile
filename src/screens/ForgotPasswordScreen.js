import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';

export default class ForgotPassword extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        UserLogin: '',
        UserPassword: ''
    }
  }

  render() {
    return(
      <Background>

        <BackButton goBack={() => this.props.navigation.navigate('Starter')} />

        <Logo />

        <Header>Mot de passe oublié</Header>

        <TextInput
          placeholder="Entrez votre identifiant (Mail/Login)"
          autoCapitalize="none"
          onChangeText={UserLogin => this.setState({UserLogin})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />

        <Button mode="contained" >
          Changer de mot de passe
        </Button>

      </Background>
    );
  }
}


const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
