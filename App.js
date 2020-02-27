import React, { Component } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { Badge, Icon } from "react-native-elements"

class FlatListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      getItem: this.props.item
    }
  }
  onClick = () => {
    this.setState(state => ({
      getItem: {
        ...state.getItem,
        isDone: !this.state.getItem.isDone
      }
    }))

  }
  render() {
    const styles = StyleSheet.create({
      text: {
        color: "black",
        fontWeight: "500",
        textAlign: "center",
      },
      activeLineThrough: {
        textDecorationLine: "line-through"
      } 
    })
    console.log("Style: ", styles.text.color)
    return (
      <View style={{
        backgroundColor: "aliceblue",
        borderRadius: 3,
        padding: 3,
        marginBottom: 6,
        marginTop: 5,
        flexDirection: "row"
      }}>
        <View style={{
          paddingTop: 8
        }}>
          <Badge status="success" value={this.props.index + 1} />
        </View>
        <View style={{
          flex: 7
        }}>
          {
            <Text style={[styles.text, this.state.getItem.isDone && styles.activeLineThrough]}>
              {this.props.item.value}</Text>
          }
        </View>
        <View style={{
          flex: 4
        }}>
          <Button
            title={this.state.getItem.isDone ? "DONE!" : "OK"}
            onPress={this.onClick}
            color={this.state.getItem.isDone ? "" : "#f194ff"}
          ></Button>
        </View>
      </View>
    )
  }
}



export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      dataItem: null,
      data: [],
      error: ""
    }
    this.handleTextInput = this.handleTextInput.bind(this) //Dòng này nữa
  }

  submit = () => {
    if (this.state.dataItem === null) {
      this.setState(state => {
        return {
          error: "Vui lòng nhập dữ liệu"
        }
      })
    }
    else {
      this.setState((state) => {
        return { data: [...state.data, this.state.dataItem] }
      })
      this.textInput.clear()
      this.setState(state => {
        return {
          dataItem: null
        }
      })
    }
  }

  handleTextInput = (newText) => {
    this.setState((state) => {
      return {
        dataItem: {
          value: newText,
          isDone: false
        }
      }
    })
  }
  render() {


    const { name } = this.state
    return (
      <View style={{ alignItems: "center", flex: 1, justifyContent: "center", backgroundColor: "powderblue" }}>
        <View style={{
          flex: 2,
          marginTop: 40,
        }}>
          <View>
            <TextInput style={{ backgroundColor: "white", height: 30, padding: 10 }}
              ref={input => { this.textInput = input }} //Dòng này
              onChangeText={this.handleTextInput}
              placeholder="Add new data"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            {/* /* Check nếu dataItem == null thì button == disabled */}
            <Button title={"Thêm"} onPress={this.submit} disabled={this.state.dataItem === null}></Button>
            {/* Dòng trên */}
          </View>
          {
            this.state.dataItem === null && <View style={{
              backgroundColor: "red",
              marginTop: 10,
              borderRadius: 3
            }}>
              <Text style={{
                textAlign: "center",
                color: "white",
                fontWeight: "600"
              }}>
                {this.state.error}</Text>
            </View>
          }
        </View>

        <View style={{
          flex: 8,
          width: 200,
          borderRadius: 5,
        }}>
          <Text style={{
            color: "dimgray",
            fontWeight: "bold",
            paddingLeft: 5
          }}>Todo list:</Text>
          <FlatList
            style={{
              height: 300
            }}
            data={this.state.data}
            renderItem={({ item, index }) => {
              return (
                <FlatListItem dataFromMain={this.state.data} item={item} index={index} />
              )
            }}
          >
          </FlatList>
        </View>
      </View>

    )
  }
}
