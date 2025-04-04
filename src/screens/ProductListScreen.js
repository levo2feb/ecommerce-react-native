import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, TextInput, View, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = useCallback(
    ({ item }) => <ProductCard product={item} navigation={navigation} />,
    [navigation]
  );

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.search}
        placeholder="Search Products..."
        value={search}
        onChangeText={setSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          initialNumToRender={6}
          maxToRenderPerBatch={10}
          removeClippedSubviews={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8
  }
});

export default ProductListScreen;
