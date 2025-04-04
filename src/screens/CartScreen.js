import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const items = JSON.parse(await AsyncStorage.getItem('cart')) || [];
      setCartItems(items);
    };
    loadCart();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.title} - ${item.price}</Text>
        )}
      />
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: { padding: 10 },
  total: { padding: 10, fontWeight: 'bold', fontSize: 16 }
});

export default CartScreen;
