import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar, Card } from 'react-native-paper';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Explore</Text>
      <Searchbar
        placeholder="Search..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">Nothing here yet</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Add your content here
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: 16,
    marginTop: 8,
  },
  searchbar: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 12,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.6,
  },
});
