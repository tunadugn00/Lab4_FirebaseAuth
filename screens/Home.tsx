//screens\Home.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth'; 



const AUTO_LOGOUT_TIME = 5000;

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  let timeoutId: NodeJS.Timeout; 

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword' as never);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Đăng xuất người dùng
      navigation.navigate('Login' as never); // Chuyển hướng về màn hình đăng nhập
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  
  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(handleLogout, AUTO_LOGOUT_TIME);
  };

  useEffect(() => {
    resetTimeout(); // Đặt timeout khi component mount

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        resetTimeout(); // Reset timeout khi ứng dụng trở lại trạng thái hoạt động
      }
    });

    return () => {
      clearTimeout(timeoutId);
      subscription.remove(); // Hủy đăng ký khi component unmount
    };
  }, []);

  return (
    <LinearGradient
      colors={['#0099FF', '#33CCFF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Gumasushiuuu</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
  },
  buttonText: {
    color: '#0099FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
