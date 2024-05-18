// Transaction.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { icons } from '../utils/icons/icons'

const Transaction = ({ category, amount, iconName }) => {
  const Icon = icons[iconName];

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {Icon}
      </View>
      <Text style={styles.categoryText}>{category}</Text>
      <Text style={styles.amountText}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 8,
    marginRight: 10,
  },
  categoryText: {
    flex: 1,
    fontSize: 16,
  },
  amountText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Transaction;
