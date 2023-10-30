import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const { params } = useRoute();

  return (
    <View style={{ flex: 1 }} initialRegion={{}}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: params?.location?.latitude,
          longitude: params?.location?.longitude,
        }}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: params?.location?.latitude,
            longitude: params?.location?.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
