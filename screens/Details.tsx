import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text, View, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useColorScheme } from 'nativewind';
import DarkMode from 'components/ui/DarkMode';
import StarWarsText from 'components/ui/StarWarsText';
import CustomButton from 'components/ui/CustomButton';
import CommonPopup from 'components/ui/CommonPopup';
import { useState } from 'react';

type DetailsParams = {
  data: any;
  type: "person" | "planet" | "film";
};

type DetailsRouteProp = RouteProp<{ Details: DetailsParams }, "Details">;

const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { data, type } = route.params;
  const keys = Object.keys(data);
  const { colorScheme } = useColorScheme();
  const isDark:boolean = colorScheme === 'dark';

  const [showPopup, setShowPopup] = useState(false);

  const getRelatedUrls = ():[] => {
    switch(type) {
      case 'person': return data.peliculas || [];
      case 'planet': return data.peliculas || [];
      case 'film': return data.personas || [];
      default: return [];
    }
  };

  // Title according to the type.
  const getTitle = (): string => {
    switch (type) {
      case "person":
        return "Archivos Biográficos";
      case "planet":
        return "Informe Planetario";
      case "film":
        return "Datos de Producción";
      default:
        return "Registro GALÁCTICO";
    }
  };

  // Subtitle with the name
  const getEntityName = (): string => {   
    switch (type) {
      case "person":
        return `de ${data.nombre}`;
      case "planet":
        return `de ${data.nombre}`;
      case "film":
        return `de ${data["título"]}`;
      default:
        return "";
    }
  };

  // Subtitle according to the type.
  const getSubtitle = ():string => {
    switch(type) {
      case 'person':
        return "Datos sensibles de ser vivo registrado";
      case 'planet':
        return "Especificaciones técnicas certificadas por la Alianza";
      case 'film':
        return "Documentación holocrónica de la trilogía";
      default:
        return "Registro oficial del Archivo Imperial";
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-blue-50 dark:bg-gray-900">
      {/* Icons or opening crawl */}
      <DarkMode/>
      <View className="items-center my-6 relative w-full">
        {type === 'person' && <FontAwesome5 name="jedi" size={100} color={isDark ? "#FFE81F" : "#3498db"} />}
        {type === 'planet' && <FontAwesome5 name="globe" size={100} color={isDark ? "#FFE81F" : "#3498db"} />}
        {type === 'film' && <FontAwesome5 name="film" size={100} color={isDark ? "#FFE81F" : "#3498db"} />}
      </View>
      
      {/* Title, Subtitle and button to open popup */}
      <View className="mb-6">
        <Text className="text-blue-600 dark:text-yellow-400 text-3xl font-bold text-center">
          {getTitle()}
        </Text>
        <Text className="text-3xl text-center mt-1 text-blue-600 dark:text-yellow-400 font-semibold">
          {getEntityName()}
        </Text>
        <Text className="text-sm text-center mt-2 mb-3 text-blue-500 dark:text-yellow-200">
          {getSubtitle()}
        </Text>

      </View>
  
      {/* Content */}
      <View className="border border-blue-300 dark:border-yellow-400 rounded-lg p-4 mb-10">
        {keys.map((key, index) => (
            (key !== "personas" && key !== "peliculas")  &&
          <View 
            key={key} 
            className="p-4 my-1 flex flex-row flex-wrap justify-between"
            style={{
              borderColor: isDark ? "#FFE81F" : "#3498db",
              borderTopWidth: index !== 0 ? 1 : 0
            }}
          >
            <Text className="text-blue-700 dark:text-yellow-400 font-bold ">
              {key.toUpperCase()}:
            </Text>
            <Text className="ml-2 text-blue-800 dark:text-gray-200">
              {key==="sinopsis" 
              ?
                <View className=" w-full h-40 justify-center items-center overflow-hidden">
                  <StarWarsText text={data.sinopsis}/>
                </View>
              
              :
              String(data[key])}
            </Text>
          </View>
        ))}

        <CustomButton
          variant="primary"
          className="mt-4 mx-auto"
          onPress={() => setShowPopup(true)}
          title={
            type === "film"
              ? "Elenco de personajes"
              : "Apariciones"
          }
          
        />
      {/* Popup */}
      {showPopup && (
        <CommonPopup
          urls={getRelatedUrls()}
          type={type}
          onClose={() => setShowPopup(false)}
        />
      )}
      
      </View>
    </ScrollView>
  );
};

export default Details;
