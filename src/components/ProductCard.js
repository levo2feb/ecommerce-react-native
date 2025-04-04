import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', { product })}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 14,
    marginTop: 5
  },
  price: {
    color: 'green',
    marginTop: 5
  }
});

export default memo(ProductCard);
