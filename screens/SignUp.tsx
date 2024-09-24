import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordStrengthIndicator from '../components/PasswordStrengthIndicator';

const auth = getAuth();

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', confirmPassword: '', general: '' };

    if (!email) {
      newErrors.email = 'Email cannot be blank';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password cannot be blank';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must have at least 6 characters';
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigation.navigate('Login' as never);
      } catch (error) {
        setErrors(prev => ({ ...prev, general: 'Unable to create account. Please try again.' }));
      }
    }
  };

  const handleInputChange = (field: keyof typeof errors) => (text: string) => {
    if (field === 'email') setEmail(text);
    if (field === 'password') setPassword(text);
    if (field === 'confirmPassword') setConfirmPassword(text);
    setErrors(prev => ({ ...prev, [field]: '', general: '' }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContaineremail}>
            <Feather name="mail" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7F8C8D"
              value={email}
              onChangeText={handleInputChange('email')}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          
          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7F8C8D"
              value={password}
              onChangeText={handleInputChange('password')}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#7F8C8D" />
            </TouchableOpacity>
          </View>
          {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          <PasswordStrengthIndicator password={password} />
          
          <View style={styles.inputContainer}>
            <Feather name="check-circle" size={20} color="#7F8C8D" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#7F8C8D"
              value={confirmPassword}
              onChangeText={handleInputChange('confirmPassword')}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#7F8C8D" />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          
          {errors.general ? <Text style={styles.errorText}>{errors.general}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
            <Text style={styles.loginLink}>Log in</Text>
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
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  inputContaineremail: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    marginBottom: 10,
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
  button: {
    backgroundColor: '#3498DB',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E74C3C',
    marginBottom: 10,
    marginLeft: 5,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  loginLink: {
    color: '#3498DB',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default SignupScreen;