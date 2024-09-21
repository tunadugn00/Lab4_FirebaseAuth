import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth'; // Import getAuth và signOut



const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth(); // Lấy instance của auth

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất người dùng
      navigation.navigate('Login' as never); // Chuyển hướng về màn hình đăng nhập
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <LinearGradient
      colors={['#0099FF', '#33CCFF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Home</Text>
      </View>
    
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: '#FF5E62',
    marginTop: 10,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF5E62',
    padding: 20,
    alignItems: 'center',
    borderRadius: 50,
    marginBottom: 1000,
    marginLeft:170,
    width:120,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
