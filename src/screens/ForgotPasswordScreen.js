import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
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
        isLoading : false,
        UserEmail: '',
    }
  }

  ChangePasswordFunction = () =>{
    this.setState({ isLoading: true });
    const { UserEmail } = this.state ;
    var details = {
      'email' : UserEmail,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    //192.168.1.14
    //192.168.43.41
    fetch("http://192.168.1.14:9090/forgotPassword/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then(response => response.json())
      .then((responseJson) => {
        if(responseJson.success){
          alert("Un mail vient de vous être envoyé");
          this.setState({ isLoading: false });
        }
        else{
          alert("Cette adresse mail n'existe pas");
        }
        })
      .catch(error=>console.log(error))
  }

  render() {
    return(
      <Background>

        <BackButton goBack={() => this.props.navigation.navigate('Starter')} />

        <Logo />

        <Header>Mot de passe oublié</Header>

        <TextInput
          placeholder="Entrez votre adresse mail"
          autoCapitalize="none"
          onChangeText={UserEmail => this.setState({UserEmail})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />

        <Button mode="contained" onPress={this.ChangePasswordFunction}>
          Changer de mot de passe
        </Button>
        <ActivityIndicator animating={this.state.isLoading} />

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
