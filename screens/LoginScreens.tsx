// screens\LoginScreens.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { Feather } from '@expo/vector-icons';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBPu5cbHy-FO2pvM0PquNThaO472U_UxT4",
  authDomain: "lab4-firebase-150db.firebaseapp.com",
  projectId: "lab4-firebase-150db",
  storageBucket: "lab4-firebase-150db.appspot.com",
  messagingSenderId: "202700732074",
  appId: "1:202700732074:web:4906a173e70dd9b8d482d3",
  measurementId: "G-P55DRDS04Q"
};




const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION = 30000;

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    loadSavedCredentials();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      setError('');
    }, [])
  );


  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('savedEmail');
      const savedPassword = await AsyncStorage.getItem('savedPassword');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error loading saved credentials:', error);
    }
  };

  const handleLogin = async () => {
    const currentTime = Date.now();

    // Kiểm tra thời gian khóa
    if (lockoutTime && currentTime < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime - currentTime) / 1000);
      setError(`Account locked. Try again in ${remainingTime} seconds.`);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFailedAttempts(0); // Reset failed attempts on successful login

      if (rememberMe) {
        // Save credentials logic...
      } else {
        // Remove saved credentials logic...
      }
      navigation.navigate('Home' as never);
    } catch (error) {
      setFailedAttempts(prev => prev + 1); // Increment failed attempts
      setError('Invalid email or password');

      // Kiểm tra số lần đăng nhập thất bại
      if (failedAttempts + 1 >= MAX_FAILED_ATTEMPTS) {
        setLockoutTime(Date.now() + LOCKOUT_DURATION); // Đặt thời gian khóa
        setError('Too many failed attempts. Your account is locked for 30 seconds.');
      }
    }
  };



  const handleSocialLogin = (platform: string) => {
    // Implement social login logic here
    console.log(`Login with ${platform}`);
  };
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (text: string) => {
    setter(text);
    setError('');
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        
        <Text style={styles.title}>Gumayusiuuuu</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7F8C8D"
              value={email}
              onChangeText={handleInputChange(setEmail)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7F8C8D"
              value={password}
              onChangeText={handleInputChange(setPassword)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#7F8C8D" />
            </TouchableOpacity>
          </View>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <Feather name="check" size={16} color="#3498DB" />}
            </TouchableOpacity>
            <Text style={styles.rememberMeText}>Remember Me</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  formContainer: {
    width: '85%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#FFFFFF',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#3498DB',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: -70,
  },
  forgotPasswordText: {
    color: '#3498DB',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E74C3C',
    marginBottom: 10,
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  signupLink: {
    color: '#3498DB',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;