// src/screens/People.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CommonList from "../components/ui/CommonList";
import { fetchTranslatedPeopleData, Person } from "../services/swapiService";

const People = () => {
  const navigation = useNavigation();
  const [people, setPeople] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>(
    "https://swapi.py4e.com/api/people/"
  );

  const getPeople = async (url: string) => {
    try {
      const data = await fetchTranslatedPeopleData(url);
      setPeople(data.results);
      setTotalItems(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    const baseUrl = "https://swapi.py4e.com/api/people/";
    const newUrl = searchTerm ? `${baseUrl}?search=${searchTerm}` : baseUrl;
    setCurrentPage(newUrl);
  }, [searchTerm]);

  useEffect(() => {
    getPeople(currentPage);
  }, [currentPage]);

  return (
    <View className="flex-1 bg-black p-4">
      <CommonList<Person>
        data={people}
        titleKey="nombre"
        onPrev={() => prevPage && setCurrentPage(prevPage)}
        onNext={() => nextPage && setCurrentPage(nextPage)}
        hasPrev={!!prevPage}
        hasNext={!!nextPage}
        type="person"
        searchPlaceholder="Buscar personaje..."
        onSearch={setSearchTerm}
        currentSearchTerm={searchTerm}
        totalItems={totalItems}
        currentPageUrl={currentPage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default People;