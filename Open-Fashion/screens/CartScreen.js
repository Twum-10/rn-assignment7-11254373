import React, { useState, useEffect } from 'react';
import { ScrollView,View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        setCart(cartData ? JSON.parse(cartData) : []);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      let cartData = await AsyncStorage.getItem('cart');
      cartData = cartData ? JSON.parse(cartData) : [];
      const updatedCart = cartData.filter(item => item.id !== productId);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price;
    }, 0).toFixed(2);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (cart.length === 0) {
    return <Text>Your cart is empty</Text>;
  }

  return (
    <ScrollView>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItemContainer}>
            <Image
              source={{ uri: item.image }} 
              style={styles.productImage}
            />
            <Text style={styles.title}>{item.title}</Text>         
            <Text style={styles.productPrice}>{"$"+item.price}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Image source={require('../assets/rem.png')} style={styles.removeIcon} />
      </TouchableOpacity>
            
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Estimated Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
      },
      cartItemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
      },
      productImage: {
        width: 100,
        height: 120,
      },
      title: {
        flex: 1,
        marginLeft: 10,
        width:5
      },
      productPrice: {
        color: 'red',
        fontSize:16
        
      },
      removeButton: {
        padding: 5,
      },
      removeIcon: {
        width: 40,
        height: 40,
        borderRadius:10
      },
      totalContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
      },
      totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      checkoutButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
      },
      checkoutButtonText: {
        color: 'white',
        fontSize: 16,
      }
});

export default CartScreen;
