import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    if (!user) {
      setError('No user is currently signed in');
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      Alert.alert('Success', 'Password updated successfully');
      navigation.goBack();
    } catch (error) {
      setError('Failed to change password. Please check your current password.');
    }
  };

  return (
    <LinearGradient colors={['#0099FF', '#33CCFF']} style={styles.gradient}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Change Password</Text>
          
          <View style={styles.inputContainer}>
            <Feather name="lock" size={24} color="#0099FF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Feather name="lock" size={24} color="#0099FF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Feather name="check-circle" size={24} color="#0099FF" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              secureTextEntry
            />
          </View>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
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
  cancelButton: {
    marginTop: 15,
  },
  cancelButtonText: {
    color: '#0099FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#0099FF',
    marginBottom: 10,
  },
});

export default ChangePasswordScreen;