import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'

export default function Notifications() {

  return (
    <View>
      <Text style={styles.notificationsTittle}>Pendientes</Text>

     <View> 
        <Text style={styles.infoTittle}>Por Cobrar</Text>
        
      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  notificationsTittle: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    backgroundColor: '#6e92c4',
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 10,
    
  },
infoTittle: {
  fontSize: 18,
  fontWeight: "bold",
  backgroundColor: "#D3D3D3",
  padding: 10,
  },


});