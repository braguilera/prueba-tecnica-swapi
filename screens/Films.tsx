// src/screens/Films.tsx

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity } from "react-native";
import { fetchTranslatedFilmsData, FilmsApiResponse, Film } from "../services/swapiService";

const Films = () => {
  const navigation = useNavigation();
  const [films, setFilms] = useState<Film[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("https://swapi.py4e.com/api/films/");

  const getFilms = async (url: string) => {
    try {
      const data: FilmsApiResponse = await fetchTranslatedFilmsData(url);
      setFilms(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  useEffect(() => {
    getFilms(currentPage);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Películas de Star Wars</Text>
      <FlatList
        data={films}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { data: item, type: "film" })}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.item}>{item.titulo}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Anterior" onPress={() => prevPage && setCurrentPage(prevPage)} disabled={!prevPage} />
        <Button title="Siguiente" onPress={() => nextPage && setCurrentPage(nextPage)} disabled={!nextPage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  item: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Films;
