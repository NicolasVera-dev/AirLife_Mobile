import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView } from 'react-native';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import { emailValidator, passwordValidator } from '../../core/utils';

export default class RegisterScreen extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
        UserLogin: '',
        UserEmail: '',
        UserFirstname: '',
        UserLastname: '',
        UserPassword: '',
        UserAddress: '',
        UserTelphone: '',
    }
  }        

  UserRegisterFunction = () =>{
    const { UserLogin } = this.state ;
    const { UserEmail } = this.state ;
    const { UserFirstname } = this.state ;
    const { UserLastname } = this.state ;
    const { UserPassword } = this.state ;
    const { UserAddress } = this.state ;
    const { UserTelphone } = this.state ;

    //192.168.1.14
    //192.168.43.41
    fetch('http://192.168.43.41:9090/inscription/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: UserEmail,
        login: UserLogin,
        firstname: UserFirstname,
        lastname: UserLastname,
        password: UserPassword,
        address: UserAddress,
        numTel: UserTelphone
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.success){
          this.props.navigation.navigate('Starter');
        }
        else{
          alert("Vous n'avez pas pu être enregistré");
        }
        }).catch((error) => {
          console.error(error);
        });
  }

  render()
  {
     return(
       <Background>
        <BackButton goBack={() => this.props.navigation.navigate('Starter')} />
        <Logo />
        <Header>Créer un compte</Header>
        <ScrollView
          persistentScrollbar={true}
          contentContainerStyle={styles.contentContainer}>
          <TextInput
            placeholder="Adresse email"
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            onChangeText={UserEmail => this.setState({UserEmail})}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Identifiant"
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            onChangeText={UserLogin => this.setState({UserLogin})}
          />
          <TextInput
            placeholder="Mot de passe"
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            onChangeText={UserPassword => this.setState({UserPassword})}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Prénom"
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            onChangeText={UserFirstname => this.setState({UserFirstname})}
          />
          <TextInput
            placeholder="Nom"
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            onChangeText={UserLastname => this.setState({UserLastname})}
          />
          <TextInput
            placeholder="Adresse"
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            onChangeText={UserAddress => this.setState({UserAddress})}
          />
          <TextInput
            placeholder="Numéro de téléphone"
            underlineColorAndroid="transparent"
            style={styles.TextInputStyleClass}
            onChangeText={UserTelphone => this.setState({UserTelphone})}
          />
        </ScrollView>
        <Button mode="contained" onPress={this.UserRegisterFunction} style={styles.button}>
          Créer un compte
        </Button>
       </Background>
     );
  }
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  contentContainer: {
    width : 280
  },
  logo: {
    marginTop: 20
  }
});
