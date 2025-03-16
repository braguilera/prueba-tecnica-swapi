import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type DetailsParams = {
  data: any; // Puede ser una persona, planeta o película
  type: "person" | "planet" | "film";
};

type DetailsRouteProp = RouteProp<{ Details: DetailsParams }, "Details">;

const Details = () => {
  // Usamos useRoute para obtener los parámetros
  const route = useRoute<DetailsRouteProp>();
  const { data, type } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles ({type})</Text>
      {Object.keys(data).map((key) => (
        <View key={key} style={styles.detailContainer}>
          <Text style={styles.detailKey}>{key}: </Text>
          <Text style={styles.detailValue}>{String(data[key])}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  detailKey: {
    fontWeight: "bold",
  },
  detailValue: {
    flex: 1,
    marginLeft: 5,
  },
});

export default Details;
