import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, ScrollView, Dimensions, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { mapCustomStyle } from '../mapStyle';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../common/design';

const INITIAL_REGION = {
  latitude: 45.5017,
  longitude: -73.5673,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapComponent = () => {
  const [location, setLocation] = useState(null);
  const [foodLocations, setFoodLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const fetchFoodLocations = async () => {
    try {
      const response = await fetch('http://192.168.1.53:5002/api/foods/foodlocations');
      const data = await response.json();
      console.log('Fetched food locations:', data);
      const validFoodLocations = data.filter(item => 
        item.availability && 
        item.availability.altitude_availability && 
        item.availability.longitude_availability
      );
      setFoodLocations(validFoodLocations);
    } catch (error) {
      console.error('Error fetching food locations:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        setIsLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
      }
    } catch (error) {
      console.error('Error getting location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    fetchFoodLocations();
  }, []);

  const handleMarkerPress = (food) => {
    setSelectedFood(food);
    setModalVisible(true);
  };

  const handleViewDetails = () => {
    if (selectedFood) {
      navigation.navigate('FoodDetail', { foodId: selectedFood.id_food });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapCustomStyle}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {foodLocations.map((food) => (
          <Marker
            key={food.id_food}
            coordinate={{
              latitude: parseFloat(food.availability?.altitude_availability?.replace(/\"/g, '')) || 0,
              longitude: parseFloat(food.availability?.longitude_availability?.replace(/\"/g, '')) || 0,
            }}
            onPress={() => handleMarkerPress(food)}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerOuter}>
                <Icon name="fast-food" size={20} color={Colors.secondary} />
              </View>
              <View style={styles.markerTriangle} />
            </View>
          </Marker>
        ))}
      </MapView>

      {modalVisible && selectedFood && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close-circle" size={32} color={Colors.secondary} />
              </TouchableOpacity>

              <ScrollView bounces={false}>
                {selectedFood.images?.length > 0 && (
                  <Image
                    source={{ uri: `http://192.168.1.53:5002/api/${selectedFood.images[0]}` }}
                    style={styles.foodImage}
                    resizeMode="cover"
                  />
                )}

                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{selectedFood.name_food}</Text>
                  <Text style={styles.description} numberOfLines={3}>
                    {selectedFood.description_food}
                  </Text>

                  <View style={styles.detailsRow}>
                    <Icon name="location-outline" size={20} color={Colors.secondary} />
                    <Text style={styles.detailText}>
                      {selectedFood.availability?.adresse_availability || 'No address available'}
                    </Text>
                  </View>

                  <View style={styles.detailsRow}>
                    <Icon name="time-outline" size={20} color={Colors.secondary} />
                    <Text style={styles.detailText}>
                      {selectedFood.availability?.time_availability || 'No time available'}
                    </Text>
                  </View>

                  <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={handleViewDetails}
                  >
                    <Text style={styles.buttonText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerOuter: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  markerTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
    transform: [{ translateY: -5 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '80%',
    minHeight: '50%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  foodImage: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
  detailsButton: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MapComponent;