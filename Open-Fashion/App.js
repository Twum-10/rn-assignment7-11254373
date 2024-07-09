import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Drawer.Screen name="Our Store" component={HomeScreen} />
        <Drawer.Screen name="Product Details" component={ProductDetailScreen} />
        <Drawer.Screen name="Cart" component={CartScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
