import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { api } from '../services/api';

const DiseaseListScreen = () => {
  const [diseases, setDiseases] = useState([]);

  useEffect(() => {
    api.get('/api/diseases').then(res => setDiseases(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={diseases}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <Text>{item.code} - {item.name} | CID: {item.cid}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 }
});

export default DiseaseListScreen;