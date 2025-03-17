import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CommonList from "../components/ui/CommonList";
import { fetchTranslatedPlanetsData, Planet } from "../services/swapiService";
import LoadingAnimation from "components/ui/LoadingAnimation";
import { SearchInput } from "components/ui/SearchInput";
import { getEndpoint } from "services/swapiEndpoints";
import DarkMode from "components/ui/DarkMode";
import EmptyState from "components/ui/EmptyState";

const Planets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>(getEndpoint('planet'));
  const [loading, setLoading] = useState(false)

  const getPlanets = async (url: string) => {
    setLoading(true)
    try {
      const data = await fetchTranslatedPlanetsData(url);
      setPlanets(data.results);
      setTotalItems(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching planets:", error);
    } finally{
      setLoading(false)
    }
  };

    useEffect(() => {
      const baseUrl = getEndpoint('planet');
      const newUrl = searchTerm ? `${baseUrl}?search=${searchTerm}` : baseUrl;
      setCurrentPage(newUrl);
    }, [searchTerm]);

  useEffect(() => {
    getPlanets(currentPage);
  }, [currentPage]);

  return (
    <View className="flex-1 bg-blue-50 dark:bg-gray-900 p-4">
      <DarkMode/>
      <Text className="text-3xl font-bold text-center text-blue-600 dark:text-yellow-400">
        CARTOGRAFÍA DE MUNDOS CONOCIDOS
      </Text>
      <Text className="text-sm text-center m-2 text-blue-500 dark:text-yellow-200">
        Catálogo imperial de cuerpos celestes clasificados
      </Text>
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar planeta..."
      />
      {loading ? (
        <LoadingAnimation message="Inicializando cartografía imperial..." />
      ) : (
          planets.length===0 
          ?
          <EmptyState message="No se encontraron planetas."/>
          :
          <CommonList<Planet>
          data={planets}
          titleKey="nombre"
          onPrev={() => prevPage && setCurrentPage(prevPage)}
          onNext={() => nextPage && setCurrentPage(nextPage)}
          hasPrev={!!prevPage}
          hasNext={!!nextPage}
          type="planet"
          totalItems={totalItems}
          currentPageUrl={currentPage}
        />
      )}
    </View>
  );
};

export default Planets;