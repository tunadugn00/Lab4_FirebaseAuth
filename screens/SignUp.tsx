// screens\SignUp.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';

const auth = getAuth();

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful signup (e.g., navigate to home screen)
      navigation.navigate('Login' as never)
    } catch (error) {
      setError('Failed to create account');
    }
  };
  const handleSocialSignup = (platform: string) => {
    // Implement social signup logic here
    console.log(`Sign up with ${platform}`);
  };



  return (
    <LinearGradient colors={['#0099FF', '#33CCFF']} style={styles.gradient}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create Account</Text>
            <View style={styles.inputContaineremail}>
              <Feather name="mail" size={24} color="#0099FF" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Feather name="lock" size={24} color="#0099FF" style={styles.icon} />
              <TextInput
                style={styles.inputpass}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#0099FF" />
              </TouchableOpacity>
            </View>
            <PasswordStrengthIndicator password={password} />
            
            <View style={styles.inputContainer}>
              <Feather name="check-circle" size={24} color="#0099FF" style={styles.icon} />
              <TextInput
                style={styles.inputpass}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={24} color="#0099FF" />
              </TouchableOpacity>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('Login' as never)}>
              <Text style={styles.linkButtonText}> Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
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
    color: '#0099FF',
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
  inputContaineremail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 45,
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
    backgroundColor: '#0099FF',
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
    color: '#FF3B30',
    marginBottom: 10,
  },
  linkButton: {
    marginTop: 20,
  },
  linkButtonText: {
    color: '#0099FF',
    fontSize: 16,
    fontWeight:'bold',
  },
  socialSignupContainer: {
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
});

export default SignupScreen;