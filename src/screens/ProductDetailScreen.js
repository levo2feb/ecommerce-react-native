import React, { useCallback } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  const addToCart = useCallback(async () => {
    try {
      const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Success', 'Item added to cart');
    } catch (e) {
      console.error('Add to cart error:', e);
    }
  }, [product]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: 200, height: 200, alignSelf: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 16, color: 'green' },
  description: { marginVertical: 10 }
});

export default ProductDetailScreen;
