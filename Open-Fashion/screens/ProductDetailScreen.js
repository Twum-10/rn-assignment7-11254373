import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProductDetails } from '../api/api';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductDetails(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async () => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      navigation.navigate('Cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <Text>Loading....</Text>;
  }

  if (productId ===0) {
    return <Text>No product details available</Text>;
  }

  return (
    <ScrollView>
      <Text style={{ fontWeight:"bold",fontSize:24,marginLeft:20 }}>{product.title}</Text>
      <Image
        source={{ uri: product.image }} 
        style={{ width: 350, height: 400,marginLeft:20, marginTop:20,borderRadius:20 }} 
      />
      <Text style={{ marginTop:10,marginLeft:10,fontSize:18 }}>{product.description}</Text>
      <Text style={{ color:"red",margin:10,fontSize:20 }}>{"$"+product.price}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </ScrollView>
  );
};

export default ProductDetailScreen;
