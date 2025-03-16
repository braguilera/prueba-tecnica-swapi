import React from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type DetailsParams = {
  data: any;
  type: "person" | "planet" | "film";
};

type DetailsRouteProp = RouteProp<{ Details: DetailsParams }, "Details">;

const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { data, type } = route.params;

  return (
    <ScrollView className="flex-1 p-4">
      
      <View className="bg-white border border-yellow-500 rounded-lg p-4 mb-3">
      {Object.keys(data).map((key) => (
        
        <View key={key} className="  border-b p-4 mb-3 grid grid-cols-2 grid-flow-row" style={{borderColor:"white", borderBottomWidth:1}}>
          <Text className="text-yellow-400 font-bold">
            {key.toUpperCase()}:
          </Text>
          <Text className="ml-2"  style={{color:"white"}}>
            {String(data[key])}
          </Text>
      </View>
      ))}
      </View>
      
      <View className="items-center mt-6 mb-12 opacity-20">
        <FontAwesome5 name="empire" size={100} color="#FFE81F" />
      </View>
    </ScrollView>
  );
};

export default Details;
