import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const AUTO_LOGOUT_TIME = 60000;

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  let timeoutId: NodeJS.Timeout;

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword' as never);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login' as never);
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
    resetTimeout();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        resetTimeout();
      }
    });

    return () => {
      clearTimeout(timeoutId);
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gumasushiuuu</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleChangePassword}
        >
          <Feather name="lock" size={20} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>      Logout             </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
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
    color: '#FFFFFF',
  },
  buttonContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '85%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default HomeScreen;