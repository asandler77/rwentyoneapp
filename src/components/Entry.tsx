import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

export const Entry = () => {
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState('');

  const handlePress = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:5000/ask', {
        question: input,
      });
      console.log('handlePress');
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      setAnswer('Ошибка соединения');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Введите вопрос"
          value={input}
          onChangeText={setInput}
        />
        {input.length > 0 && (
          <TouchableOpacity
            onPress={() => setInput('')}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <Button title="Отправить" onPress={handlePress} />

      <View style={styles.answerContainer}>
        <Text style={styles.answerText}>{answer}</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    paddingRight: 35,
    marginBottom: 10,
    borderRadius: 6,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
    padding: 5,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#888',
  },
  answerContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  answerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
