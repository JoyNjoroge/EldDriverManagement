import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

export default function ModalScreen() {
  const dismissModal = () => {
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is a modal</Text>
      <Text style={styles.description}>
        You can use this for settings, forms, or additional information.
      </Text>
      <TouchableOpacity onPress={dismissModal} style={styles.button}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#6b7280',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});