import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ActivityIndicator, FlatList, TouchableOpacity, Container} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';


export default class HomeActivity extends Component
{
  static navigationOptions = {
    title : 'Home',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource:[]
    }
  }

  componentDidMount(){
    var details = {
      'username': this.props.navigation.state.params.Login,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("http://192.168.43.41:9090/datasByUsers/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error))
  }

  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: .5,
        width:"100%",
        backgroundColor:"rgba(0,0,0,0.5)",
      }}/>
    );
  }

  renderItem=(data)=>
    <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>{data.item.nameSensor}</Text>
      <Text style={styles.lightText}>{data.item.datasensor}</Text>
      <Text style={styles.lightText}>{data.item.datetimedata}</Text>
    </TouchableOpacity>

    render(){
      return(
        <View style={styles.container}>
          <FlatList
            data= {this.state.dataSource}
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem= {item=> this.renderItem(item)}
            keyExtractor= {item=>item.iddata.toString()}
          />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list:{
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
  }
});
