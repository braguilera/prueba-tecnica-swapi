import { useEffect, useState } from "react";
import { View, Text, Switch } from "react-native";
import CommonList from "../components/ui/CommonList";
import { fetchTranslatedPeopleData, Person } from "../services/swapiService";
import LoadingAnimation from "components/ui/LoadingAnimation";
import { SearchInput } from "components/ui/SearchInput";
import { getEndpoint } from "services/swapiEndpoints";
import { useColorScheme } from "nativewind";
import DarkMode from "components/ui/DarkMode";
import EmptyState from "components/ui/EmptyState";

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<string>(getEndpoint('people'));
  const [loading, setLoading] = useState(false)


  const getPeople = async (url: string) => {
    setLoading(true)
    try {
      const data = await fetchTranslatedPeopleData(url);
      setPeople(data.results);
      setTotalItems(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching people:", error);
    } finally{
      setLoading(false)
    }
    
  };

  useEffect(() => {
    const baseUrl = getEndpoint('people');
    const newUrl = searchTerm ? `${baseUrl}?search=${searchTerm}` : baseUrl;
    setCurrentPage(newUrl);
  }, [searchTerm]);

  useEffect(() => {
    getPeople(currentPage);
  }, [currentPage]);

  return (
    <View className="flex-1 bg-blue-50 dark:bg-gray-900 p-4">
      <DarkMode/>
      <Text className="text-3xl font-bold text-center text-blue-600 dark:text-yellow-400">
        ARCHIVOS DE LA FUERZA VIVA
      </Text>
      <Text className="text-sm text-center m-2 text-blue-500 dark:text-yellow-200">
        Registros de seres sensibles de todos los sistemas estelares
      </Text>
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Buscar personaje..."
      />
      {loading ? (
        <LoadingAnimation message="Buscando personajes en los archivos imperiales..." />
      ) : (
        people.length===0 
        ?
        <EmptyState message="No se encontraron personas."/>
        :
        <CommonList<Person>
          data={people}
          titleKey="nombre"
          onPrev={() => prevPage && setCurrentPage(prevPage)}
          onNext={() => nextPage && setCurrentPage(nextPage)}
          hasPrev={!!prevPage}
          hasNext={!!nextPage}
          type="person"
          totalItems={totalItems}
          currentPageUrl={currentPage}
        />
      )}
    </View>
  );
};

export default People;