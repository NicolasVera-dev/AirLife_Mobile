import React from 'react';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator, FlatList, TouchableOpacity, Container} from 'react-native';

export default class SensorScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      IdSensor : '',
      dataSource:[],
      refreshing: false
    }
  }

  componentDidMount(){
    var details = {
      'username': this.props.navigation.getParam('Login'),
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
    fetch("http://192.168.1.14:9090/sensorsByUsers/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          refreshing: false,
          dataSource: responseJson
        })
      })
      .catch(error=>console.log(error))
  }

  AddSensorFunction = () =>{
    const { IdSensor } = this.state ;
    var details = {
      'idsensor' : IdSensor,
      'username': this.props.navigation.getParam('Login'),
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
    fetch("http://192.168.1.14:9090/sensors/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then(response => response.json())
      .then((responseJson) => {
        if(responseJson.success){
          alert("Le capteur a bien été ajouté");
        }
        else{
          alert("Le capteur n'a pas été ajouté");
        }
        })
      .catch(error=>console.log(error))
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.componentDidMount();
    })
  }

  DeleteSensorFunction = (data) =>{
    var details = {
      'idsensor' : data.item.idsensor,
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
    fetch("http://192.168.1.14:9090/deleteSensor/", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody
    }).then(response => response.json())
      .then((responseJson) => {
        if(responseJson.success){
          this.handleRefresh();
          console.log("Le capteur a bien été supprimé");
        }
        else{
          console.log("Le capteur n'a pas été supprimé");
        }
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
      <Text style={styles.lightText}>{data.item.libelle}</Text>
    </TouchableOpacity>

    render() {
        return (
          <View style={styles.container}>
            <FlatList
              data= {this.state.dataSource}
              ItemSeparatorComponent = {this.FlatListItemSeparator}
              renderItem= {item=> (
                <View>
                  {this.renderItem(item)}
                  <Button onPress={() => this.DeleteSensorFunction(item)} title="Supprimer"/>
                </View>
              )}
              keyExtractor= {item=>item.idsensor.toString()}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
            <TextInput
              placeholder="Entrez l'id de votre capteur"
              onChangeText={IdSensor => this.setState({IdSensor})}
            />
            <Button
              onPress={this.AddSensorFunction}
              title="Ajouter le capteur"
            />

          </View>
        );
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
