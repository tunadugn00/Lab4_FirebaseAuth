import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const getPasswordStrength = (password: string): { strength: string; color: string; flexValue: number } => {
    if (password.length === 0) {
      return { strength: '', color: 'transparent', flexValue: 0 };
    } else if (password.length < 6) {
      return { strength: 'Weak', color: '#FF3B30', flexValue: 0.33 };
    } else if (password.length < 10) {
      return { strength: 'Medium', color: '#FF9500', flexValue: 0.66 };
    } else {
      return { strength: 'Strong', color: '#34C759', flexValue: 1 };
    }
  };

  const { strength, color, flexValue } = getPasswordStrength(password);

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { flex: flexValue, backgroundColor: color }]} />
      </View>
      <Text style={[styles.strengthText, { color }]}>{strength}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#34495E',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row', // Đảm bảo các thanh tiến trình nằm ngang
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  strengthText: {
    fontSize: 12,
  },
});

export default PasswordStrengthIndicator;
