import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from './config/firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [details, setDetails] = useState('');

  const handleOrder = async () => {
    if (!name || !phone || !service) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        name,
        phone,
        service,
        details,
        status: 'Pending',
        date: new Date().toISOString(),
      });
      Alert.alert('Success', 'Order submitted successfully!');
      setName('');
      setPhone('');
      setService('');
      setDetails('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit order');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>G.I SMARTS GHANA</Text>
      <Text style={styles.subtitle}>Smart Choice for Smart People</Text>

      <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Service (Phone, Accessory, or Repair)" value={service} onChangeText={setService} />
      <TextInput style={styles.textArea} placeholder="More details (optional)" value={details} onChangeText={setDetails} multiline />

      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Submit Order</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.sloganButton}>
        <Text style={styles.sloganText}>Smart Choice for Smart People</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#222' },
  subtitle: { textAlign: 'center', color: '#555', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 15 },
  textArea: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, height: 100, marginBottom: 15 },
  button: { backgroundColor: '#007bff', borderRadius: 10, padding: 15 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  sloganButton: { backgroundColor: '#222', borderRadius: 10, padding: 10, marginTop: 20 },
  sloganText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});