import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const generateRecipe = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/generate-recipe', {
        ingredients: ingredients,
      });
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error(error);
      setRecipe('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Genie</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter an ingredient"
          value={ingredient}
          onChangeText={setIngredient}
        />
        <Button title="Add" onPress={addIngredient} />
      </View>
      <FlatList
        data={ingredients}
        renderItem={({ item }) => <Text style={styles.ingredient}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Generate Recipe" onPress={generateRecipe} disabled={ingredients.length === 0} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {recipe && (
        <ScrollView style={styles.recipeContainer}>
          <Text style={styles.recipe}>{recipe}</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  ingredient: {
    fontSize: 18,
    marginBottom: 5,
  },
  recipeContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  recipe: {
    fontSize: 16,
  },
});
