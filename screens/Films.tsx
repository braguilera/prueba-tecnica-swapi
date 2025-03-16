// src/screens/Films.tsx
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CommonList from "../components/ui/CommonList";
import { fetchTranslatedFilmsData, Film } from "../services/swapiService";

const Films = () => {
  const navigation = useNavigation();
  const [films, setFilms] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>(
    "https://swapi.py4e.com/api/films/"
  );

  const getFilms = async (url: string) => {
    try {
      const data = await fetchTranslatedFilmsData(url);
      setFilms(data.results);
      setTotalItems(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

    useEffect(() => {
      const baseUrl = "https://swapi.py4e.com/api/films/";
      const newUrl = searchTerm ? `${baseUrl}?search=${searchTerm}` : baseUrl;
      setCurrentPage(newUrl);
    }, [searchTerm]);

  useEffect(() => {
    getFilms(currentPage);
  }, [currentPage]);

  return (
    <View className="flex-1 bg-black p-4">
      <CommonList<Film>
        data={films}
        titleKey="título"
        onPrev={() => prevPage && setCurrentPage(prevPage)}
        onNext={() => nextPage && setCurrentPage(nextPage)}
        hasPrev={!!prevPage}
        hasNext={!!nextPage}
        type="film"
        searchPlaceholder="Buscar película..."
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

export default Films;