import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { fetchTranslatedPeopleData, PeopleApiResponse, Person } from "../services/swapiService";

const People = () => {
  const navigation = useNavigation();
  const [people, setPeople] = useState<Person[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("https://swapi.py4e.com/api/people/");

  const getPeople = async (url: string) => {
    try {
      const data: PeopleApiResponse = await fetchTranslatedPeopleData(url);
      setPeople(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    getPeople(currentPage);
  }, [currentPage]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personajes de Star Wars</Text>

      {/* Lista de personas: cada elemento es tocable */}
      <FlatList
        data={people}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Details", { data: item, type: "person" })
            }
          >
            <View style={styles.itemContainer}>
              <Text style={styles.item}>{item.nombre}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Botones de paginación */}
      <View style={styles.buttonContainer}>
        <Button
          title="Anterior"
          onPress={() => prevPage && setCurrentPage(prevPage)}
          disabled={!prevPage}
        />
        <Button
          title="Siguiente"
          onPress={() => nextPage && setCurrentPage(nextPage)}
          disabled={!nextPage}
        />
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

export default People;
