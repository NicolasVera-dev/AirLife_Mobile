import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Button, Text, TextInput } from 'react-native';

export default class RegisterActivity extends Component {

  static navigationOptions = {
    title: 'RegisterActivity',
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
          this.props.navigation.navigate('First');
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
       <View style={styles.MainContaineur}>
        <Text style={styles.TextComponentStyle}>Inscription</Text>
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
        <Button title="S'inscrire" color="#2196F3" onPress={this.UserRegisterFunction} />
       </View>
     );
  }
}

const styles = StyleSheet.create({
  MainContaineur:{
    justifyContent:'center',
    flex:1,
    margin:10,
  },
  TextComponentStyle:{
    fontSize:20,
    color: "#000",
    textAlign:'center',
    marginBottom:15
  },
  TextInputStyleClass:{
    textAlign:'center',
    marginBottom:7,
    height:40,
    borderWidth:1,
    borderColor: '#2196F3',
    borderRadius:5
  },
  link: {
    fontWeight: 'bold',
  }
});
