// src/screens/Planets.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CommonList from "../components/ui/CommonList";
import { fetchTranslatedPlanetsData, Planet } from "../services/swapiService";

const Planets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>(
    "https://swapi.py4e.com/api/planets/"
  );

  const getPlanets = async (url: string) => {
    try {
      const data = await fetchTranslatedPlanetsData(url);
      setPlanets(data.results);
      setTotalItems(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching planets:", error);
    }
  };

    useEffect(() => {
      const baseUrl = "https://swapi.py4e.com/api/planets/";
      const newUrl = searchTerm ? `${baseUrl}?search=${searchTerm}` : baseUrl;
      setCurrentPage(newUrl);
    }, [searchTerm]);

  useEffect(() => {
    getPlanets(currentPage);
  }, [currentPage]);

  return (
    <View className="flex-1 bg-black p-4">
      <CommonList<Planet>
        data={planets}
        titleKey="nombre"
        onPrev={() => prevPage && setCurrentPage(prevPage)}
        onNext={() => nextPage && setCurrentPage(nextPage)}
        hasPrev={!!prevPage}
        hasNext={!!nextPage}
        type="planet"
        searchPlaceholder="Buscar planeta..."
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

export default Planets;