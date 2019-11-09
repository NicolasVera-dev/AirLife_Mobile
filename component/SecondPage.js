import React, { Component } from 'react';
import { StyleSheet, View, Text, Button} from 'react-native';

export default class SecondPage extends Component
{
  static navigationOptions =
  {
    title : 'SecondPage',
  };

  render()
  {

    return(
      <View style = { styles.MainContainer }>
            <Text> {this.props.navigation.state.params.Login} </Text>
            <Text style = {styles.TextComponentStyle}> </Text>
            <Button title="Se déconnecter" onPress={ () => goBack(null) } />
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
  }
});
