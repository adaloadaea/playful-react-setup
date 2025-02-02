import React, { useState } from 'react';
import { Marker } from 'react-native-maps';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Image, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CustomMarker = ({ food }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleMarkerPress = () => {
    console.log('Marker pressed for food:', food.name_food);
    setModalVisible(true);
  };

  const handleViewDetails = () => {
    navigation.navigate('FoodDetail', { foodId: food.id_food });
    setModalVisible(false);
  };

  return (
    <>
      <Marker
        coordinate={{
          latitude: parseFloat(food.availability?.altitude_availability?.replace(/\"/g, '')) || 0,
          longitude: parseFloat(food.availability?.longitude_availability?.replace(/\"/g, '')) || 0,
        }}
        onPress={handleMarkerPress}
      >
        <Icon name="fast-food" size={24} color="#893571" />
      </Marker>

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
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="close-circle" size={32} color="#893571" />
            </TouchableOpacity>

            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              {food.first_image && (
                <Image
                  source={{ uri: `http://192.168.1.53:5002/api/${food.first_image}` }}
                  style={styles.foodImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.infoContainer}>
                <Text style={styles.title}>{food.name_food}</Text>
                <Text style={styles.description} numberOfLines={3}>
                  {food.description_food}
                </Text>

                <TouchableOpacity 
                  style={styles.detailsButton} 
                  onPress={handleViewDetails}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
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
    minHeight: '40%',
    overflow: 'hidden',
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
    color: '#893571',
    marginBottom: 10,
    fontFamily: Platform.select({ ios: 'System', android: 'normal' }),
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
    fontFamily: Platform.select({ ios: 'System', android: 'normal' }),
  },
  detailsButton: {
    backgroundColor: '#893571',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.select({ ios: 'System', android: 'normal' }),
  },
});

export default CustomMarker;