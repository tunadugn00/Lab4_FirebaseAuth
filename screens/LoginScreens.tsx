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
    <LinearGradient colors={['#0099FF', '#33CCFF']} style={styles.gradient}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} />
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Gumayusiuuu</Text>
            <View style={styles.inputContainer}>
              <Feather name="mail" size={24} color="#33CCFF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={handleInputChange(setEmail)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={24} color="#33CCFF" style={styles.icon} />
              <TextInput
                style={styles.inputpass}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={handleInputChange(setPassword)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#33CCFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.rememberMeContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && <Feather name="check" size={18} color="#33CCFF" />}
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            {/* 
                <View style={styles.socialLoginContainer}>
                  <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('google')}>
                    <FontAwesome name="google" size={24} color="#DB4437" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('facebook')}>
                    <FontAwesome name="facebook" size={24} color="#4267B2" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialLogin('github')}>
                    <FontAwesome name="github" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
                */}

            <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword' as never)}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup' as never)}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  
  },
  container: {
    flex: 1,
    paddingBottom: 150,
    
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33CCFF',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    width: 300,
  },
  inputpass: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
    width: 280,
  },
  button: {
    backgroundColor: '#33CCFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#33CCFF',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
    
  },
  signupLink: {
    color: '#33CCFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft:180,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#33CCFF',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#666',
    fontSize: 16,
  },
});

export default LoginScreen;