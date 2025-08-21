import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FishProfileModal from '../components/FishProfileModal';

const fishProfiles = [
  { id: '1', name: 'Goldie', species: 'Goldfish', age: 2, notes: 'Loves flakes' },
  { id: '2', name: 'Nemo', species: 'Clownfish', age: 1, notes: 'Hides in anemone' },
];

const FishProfileScreen = () => {
  const [profiles, setProfiles] = useState(fishProfiles);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleSaveProfile = (profile) => {
    if (selectedProfile) {
      setProfiles(profiles.map((p) => (p.id === profile.id ? profile : p)));
    } else {
      setProfiles([...profiles, profile]);
    }
    setSelectedProfile(null);
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEdit(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.species}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={profiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <FishProfileModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedProfile(null);
        }}
        onSave={handleSaveProfile}
        profile={selectedProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
  },
});

export default FishProfileScreen;
