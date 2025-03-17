import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CommonList from "../components/ui/CommonList";
import { fetchTranslatedFilmsData, Film } from "../services/swapiService";
import LoadingAnimation from "components/ui/LoadingAnimation";
import { SearchInput } from "components/ui/SearchInput";
import { getEndpoint } from "services/swapiEndpoints";

const Films = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>(getEndpoint('film'));
  const [loading, setLoading] = useState(false)

  const getFilms = async (url: string) => {
    setLoading(true)
    try {
      const data = await fetchTranslatedFilmsData(url);
      setFilms(data.results);
      setTotalItems(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching films:", error);
    } finally{
      setLoading(false)
    }
  };

    useEffect(() => {
      const baseUrl = getEndpoint('film');
      const newUrl = searchTerm ? `${baseUrl}?search=${searchTerm}` : baseUrl;
      setCurrentPage(newUrl);
    }, [searchTerm]);

  useEffect(() => {
    getFilms(currentPage);
  }, [currentPage]);

  return (
    <View className="flex-1 bg-blue-50 dark:bg-gray-900 p-4">
      <Text className="text-3xl font-bold text-center text-blue-600 dark:text-yellow-400">
        CRÓNICAS DE UNA GALAXIA MUY MUY LEJANA
      </Text>
      <Text className="text-sm text-center m-2 text-blue-500 dark:text-yellow-200">
        Holocrones cinematográficos de la era de la Rebelión
      </Text>
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar película..."
      />
      {loading ? (
        <LoadingAnimation message="Recuperando archivos de la Antigua República..." />
      ) : (
        films.length === 0 ? (
          <Text className="text-3xl font-bold text-center text-blue-600 dark:text-yellow-400">No hay películas</Text>
        ) : (
          <CommonList<Film>
            data={films}
            titleKey="título"
            onPrev={() => prevPage && setCurrentPage(prevPage)}
            onNext={() => nextPage && setCurrentPage(nextPage)}
            hasPrev={!!prevPage}
            hasNext={!!nextPage}
            type="film"
            totalItems={totalItems}
            currentPageUrl={currentPage}
          />
        )
      )}
    </View>
  );
};

export default Films;