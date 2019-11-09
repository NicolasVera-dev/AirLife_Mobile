import React, { Component } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';

export default class LoginActivity extends Component {

  static navigationOptions = {
    title: 'LoginActivity',
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

  fetch('http://192.168.1.14:9090/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody
  }).then((response) => response.json())
        .then((responseJson) => {
         if(responseJson.success){
              this.props.navigation.navigate('Second', { Login: UserLogin });
          }
          else{
            console.log(responseJson.success)
            alert("Vos informations de connexion sont incorrectes");
          }

        }).catch((error) => {
          console.error(error);
        });
  }

  render()
  {
     return(
       <View style={styles.MainContaineur}>
        <Text style={styles.TextComponentStyle}>Connexion</Text>
        <TextInput
          placeholder="Entrez votre identifiant (Mail/Login)"
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
        <Button title="Se connecter" color="#2196F3" onPress={this.UserLoginFunction} />
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
  }
});
