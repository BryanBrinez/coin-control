import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Skeleton } from "moti/skeleton";

export default function TransactionCardSkeleton({ loading }) {
  return (
    <Skeleton.Group show={loading}>
      {[...Array(5)].map((_, index) => (
        <View style={styles.skeletonContainer} key={index}>
          <Skeleton
            height={46}
            width={46}
            radius={23}
            colorMode="light"
            backgroundColor="#D4D4D4"
          />
          <View style={styles.skeletonTextContainer}>
            <Skeleton
              height={20}
              width={"60%"}
              colorMode="light"
              backgroundColor="#D4D4D4"
            />
            
          </View>
          
        </View>
      ))}
    </Skeleton.Group>
  );
}

const styles = StyleSheet.create({
  skeletonContainer: {
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
  skeletonTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  balanceSkeleton: {
    marginTop: 10,
  },
});
