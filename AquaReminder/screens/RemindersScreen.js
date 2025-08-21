import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ReminderModal from '../components/ReminderModal';
import { registerForPushNotificationsAsync, schedulePushNotification } from '../services/notifications';

const reminders = [
  { id: '1', name: 'Morning Feed', time: '8:00 AM' },
  { id: '2', name: 'Evening Feed', time: '6:00 PM' },
];

const RemindersScreen = () => {
  const [remindersList, setRemindersList] = useState(reminders);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  }, []);

  const handleSaveReminder = (reminder) => {
    if (selectedReminder) {
      setRemindersList(remindersList.map((r) => (r.id === reminder.id ? reminder : r)));
    } else {
      setRemindersList([...remindersList, reminder]);
    }
    setSelectedReminder(null);
    const time = new Date();
    const [hours, minutes] = reminder.time.split(':');
    time.setHours(parseInt(hours));
    time.setMinutes(parseInt(minutes.split(' ')[0]));
    schedulePushNotification(`Time to feed your fish!`, reminder.name, time);
  };

  const handleEdit = (reminder) => {
    setSelectedReminder(reminder);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleEdit(item)}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={remindersList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <ReminderModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedReminder(null);
        }}
        onSave={handleSaveReminder}
        reminder={selectedReminder}
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

export default RemindersScreen;