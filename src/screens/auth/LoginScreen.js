import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';

export default class LoginScreen extends Component {

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

  UserLoginFunction = () =>{
    const { UserLogin }  = this.state ;
    const { UserPassword }  = this.state ;
    var details = {
      'username': UserLogin,
      'password': UserPassword,
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
    fetch('http://192.168.43.41:9090/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then((response) => response.json())
      .then((responseJson) => {
      if(responseJson.success){
        this.props.navigation.navigate('Home', { Login: UserLogin });
      }
      else{
        alert("Vos informations de connexion sont incorrectes");
      }
      }).catch((error) => {
          console.error(error);
        });
  }

  render() {
    return(
      <Background>

        <Logo />

        <Header>Connexion</Header>

        <TextInput
          placeholder="Entrez votre identifiant (Mail/Login)"
          autoCapitalize="none"
          onChangeText={UserLogin => this.setState({UserLogin})}
          underlineColorAndroid='transparent'
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Entrez votre mot de passe"
          underlineColorAndroid="transparent"
          onChangeText={UserPassword => this.setState({UserPassword})}
          style={styles.TextInputStyleClass}
          secureTextEntry={true}
        />

        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.label}>Mot de passe oublié</Text>
          </TouchableOpacity>
        </View>

        <Button mode="contained" onPress={this.UserLoginFunction}>
          Se connecter
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Vous n'avez pas de compte? </Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.link}>Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>

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
