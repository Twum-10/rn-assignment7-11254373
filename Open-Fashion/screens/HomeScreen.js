import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProducts } from '../api/api.js';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
       
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
        <View style = {styles.topbar}>
       <View style = {styles.topbar1}><Image source={require('../assets/Logo.png')} /></View>
        <View style = {{paddingTop: 20, flexDirection: 'row'}}>
          <View style ={{marginRight:10}}><Image source={require('../assets/Search.png')} /></View>
          <Image source={require('../assets/shoppingBag.png')} /></View>          
        </View>
        
        
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
           
            <Image
              source={{ uri: item.image }} 
              style={styles.productImage}
            />
             <Text style = {styles.name}>{item.title}</Text>

            <TouchableOpacity  onPress={() => navigation.navigate('Product Details', { productId: item.id })}>
             <Text style = {styles.des}>{item.description}</Text>  
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
             <Image source={require('../assets/add.png')} style={styles.addIcon} />    
            </TouchableOpacity>

            <Text style = {styles.productPrice }>{ "$" +item.price}</Text>
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        flex: 1,
        padding: 10,
      }, 
      topbar: {
        flexDirection: 'row',
        marginBottom: 20
        
      },
      topbar1:{
        marginRight: 80,
        paddingTop: 20,
        paddingLeft: 15,
        marginLeft:80,
      },
      text1:{
        fontWeight: 'bold',
        flexDirection: 'column',
        alignContent: 'justify',
        fontSize: 20,
        fontStyle: 'italic'
      },
      text2:{
        fontWeight: 'bold',
        alignContent: 'justify',
        fontSize: 20,
        fontStyle: 'italic',
      },
    productContainer: {
        flex: 2,
        margin: 10,
        padding: 5,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
      },
      imageContainer: {
        position: 'relative',
      },
      productImage: {
        width: 130,
        height: 150,
      },
      addButton: {
        position: 'absolute',
       
        right: 0,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 5,
      },
      addIcon: {
        width: 20,
        height: 20,
      },
      productPrice: {
        color: 'red',
        backgroundColor:'#f9f9f9',
        position: 'absolute',
        bottom: 0,
        left: 0,
        
        borderRadius: 15,
        padding: 5,
      },
      row: {
        flex: 1,
        justifyContent: 'space-between',
      },
      des:{
        height:50,
        opacity:0.5,
        marginBottom:5,    
      },
      name:{
        height:'auto',
        fontWeight: 'bold',
      },
      
});

export default HomeScreen;
