import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackScreenProps } from '../../../../routes/types';

interface Message {
  id: string;
  text: string;
  sentByUser: boolean;
}

function ChatScreen({ navigation }: RootStackScreenProps<'Chat'>) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim() === '') {
      return;
    }

    // Agregar el mensaje que envió el usuario
    const userMessage: Message = {
      id: (messages.length + 1).toString(), // Incrementando el ID
      text: inputText.trim(),
      sentByUser: true, // Marcado como true ya que fue enviado por el usuario
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    let responseMessage: Message;

    switch (inputText.trim().toLowerCase()) {
      case 'hola':
        responseMessage = {
          id: (messages.length + 2).toString(),
          text: '¡Hola!',
          sentByUser: false, // Marcado como false ya que es una respuesta
        };
        break;
      case 'como estas?':
        responseMessage = {
          id: (messages.length + 2).toString(),
          text: 'Yo estoy bien y tú?!',
          sentByUser: false, // Marcado como false ya que es una respuesta
        };
        break;
      default:
        responseMessage = {
          id: (messages.length + 2).toString(),
          text: '¿Cómo va el día? ¿Puedo ayudarte?',
          sentByUser: false, // Marcado como false ya que es una respuesta
        };
        break;
    }

    setMessages(prevMessages => [...prevMessages, responseMessage]);

    setInputText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/images/paloma.png')}
          style={styles.avatar}
        />
        <Text style={styles.username}>Paloma</Text>
        {/* Aquí puedes agregar más elementos del menú si es necesario */}
      </View>
      <FlatList
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sentByUser ? styles.sentMessage : styles.receivedMessage,
            ]}>
            {!item.sentByUser && (
              <Image
                source={require('../../../../assets/images/paloma.png')}
                style={styles.avatar}
              />
            )}
            <View
              style={[
                styles.messageContent,
                !item.sentByUser && styles.receivedMessageContent,
                item.sentByUser && styles.userMessageContent,
              ]}>
              {!item.sentByUser && (
                <Text style={styles.senderName}>Paloma</Text>
              )}
              <Text>{item.text}</Text>
            </View>
            {item.sentByUser && (
              <Image
                source={require('../../../../assets/images/userbien.jpg')}
                style={styles.avatar}
              />
            )}
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={styles.sendButtonContainer}>
          <View style={styles.sendButton}>
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2', // Color de fondo del contenedor principal
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F2', // Color de fondo del encabezado
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD', // Cambiar el color del borde inferior si es necesario
    marginTop: 17, // Agregando un margen superior para desplazar hacia abajo
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333', // Color del nombre de usuario
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FFDF9A', // Color de fondo del contenedor del chat
  },
  chatContent: {
    paddingBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD', // Cambiar el color del borde superior si es necesario
    backgroundColor: '#FFFFFF', // Color de fondo del contenedor de entrada
  },
  input: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: '#F5F5F5', // Color de fondo del cuadro de entrada
  },
  sendButtonContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#765A0B', // Color de fondo del contenedor del botón de enviar
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    color: '#FFFFFF', // Color del icono del botón de enviar
  },
  userMessageContent: {
    backgroundColor: '#FFF8F2', // Color de fondo para los mensajes del usuario
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginTop: 10,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#E8E8E8', // Color de fondo del mensaje
    padding: 12,
    borderRadius: 8,
    marginLeft: 12,
    marginRight: 12,
  },
  receivedMessageContent: {
    backgroundColor: '#FFFFFF', // Color de fondo del mensaje recibido
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333', // Color del nombre del remitente
  },
});

export default ChatScreen;
