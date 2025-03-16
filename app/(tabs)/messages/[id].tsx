
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Send, ArrowLeft } from 'lucide-react-native';
import { useState, useRef, useEffect } from 'react';
import { useThemeColors } from '../../../src/hooks/useThemeColors';
import { wp, hp, fp, getSafeAreaInsets } from '../../../src/utils/responsive';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const colors = useThemeColors();
  const scrollViewRef = useRef<ScrollView>(null);
  const safeArea = getSafeAreaInsets();

  // Mock data - In a real app, this would come from your backend
  const conversation = {
    id: 1,
    user: {
      name: 'Thomas Laurent',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100',
      role: 'Superviseur',
    },
    messages: [
      {
        id: 1,
        text: 'Nouvelle ronde à effectuer sur le secteur B',
        time: '10:30',
        type: 'received',
        date: 'Aujourd\'hui'
      },
      {
        id: 2,
        text: 'Bien reçu, je m\'en occupe',
        time: '10:31',
        type: 'sent',
        date: 'Aujourd\'hui'
      },
      {
        id: 3,
        text: 'Parfait, n\'oublie pas de valider tous les points de contrôle',
        time: '10:32',
        type: 'received',
        date: 'Aujourd\'hui'
      }
    ]
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }, 200);
  }, []);

  const handleSend = () => {
    if (message.trim().length === 0) return;
    // Here you would normally send the message to your backend
    // and then update the local state with the new message
    setMessage('');
    
    // Auto-scroll to bottom of messages
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp(90) : 0}
    >
      <View style={[
        styles.header, 
        { 
          backgroundColor: colors.headerBg, 
          borderBottomColor: colors.border,
          paddingTop: Platform.OS === 'ios' ? safeArea.top : StatusBar.currentHeight ? StatusBar.currentHeight + hp(10) : hp(50)
        }
      ]}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Retour"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={wp(22)} color={colors.text} />
        </TouchableOpacity>
        <Image source={{ uri: conversation.user.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={[styles.userName, { color: colors.text, fontSize: fp(16) }]}>
            {conversation.user.name}
          </Text>
          <Text style={[styles.userRole, { color: colors.primary, fontSize: fp(13) }]}>
            {conversation.user.role}
          </Text>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {conversation.messages.map((msg, index) => (
          <View key={msg.id}>
            {(index === 0 || conversation.messages[index - 1].date !== msg.date) && (
              <Text style={[styles.dateHeader, { color: colors.textSecondary, fontSize: fp(13) }]}>
                {msg.date}
              </Text>
            )}
            <View style={[
              styles.messageWrapper,
              msg.type === 'sent' ? styles.sentWrapper : styles.receivedWrapper
            ]}>
              <View style={[
                styles.message,
                msg.type === 'sent' 
                  ? [styles.sentMessage, { backgroundColor: colors.primary }] 
                  : [styles.receivedMessage, { backgroundColor: colors.card }]
              ]}>
                <Text style={[
                  styles.messageText, 
                  { 
                    color: msg.type === 'sent' ? colors.card : colors.text,
                    fontSize: fp(15)
                  }
                ]}>
                  {msg.text}
                </Text>
                <Text style={[
                  styles.messageTime, 
                  { 
                    color: msg.type === 'sent' 
                      ? `${colors.card}B3` 
                      : `${colors.textSecondary}B3`,
                    fontSize: fp(11)
                  }
                ]}>
                  {msg.time}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[
        styles.inputContainer, 
        { 
          backgroundColor: colors.headerBg,
          borderTopColor: colors.border,
          paddingBottom: Platform.OS === 'ios' ? safeArea.bottom : hp(16) 
        }
      ]}>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.inputBg, 
              color: colors.text,
              fontSize: fp(15),
              paddingVertical: Platform.OS === 'ios' ? hp(12) : hp(8)
            }
          ]}
          placeholder="Votre message..."
          placeholderTextColor={colors.textSecondary}
          value={message}
          onChangeText={setMessage}
          multiline
          accessibilityLabel="Champ de message"
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            { 
              backgroundColor: colors.primary,
              width: wp(44),
              height: wp(44)
            }
          ]}
          onPress={handleSend}
          accessibilityLabel="Envoyer le message"
          disabled={message.trim().length === 0}
        >
          <Send color={colors.card} size={wp(20)} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: wp(15),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: wp(14),
    padding: wp(5),
  },
  avatar: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(20),
    marginRight: wp(12),
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '600',
  },
  userRole: {
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: wp(16),
    paddingBottom: hp(20),
  },
  dateHeader: {
    textAlign: 'center',
    marginVertical: hp(16),
  },
  messageWrapper: {
    marginBottom: hp(16),
    flexDirection: 'row',
  },
  sentWrapper: {
    justifyContent: 'flex-end',
  },
  receivedWrapper: {
    justifyContent: 'flex-start',
  },
  message: {
    maxWidth: '80%',
    padding: wp(12),
    borderRadius: wp(16),
  },
  sentMessage: {
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    lineHeight: fp(22),
  },
  messageTime: {
    marginTop: hp(4),
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: wp(16),
    borderTopWidth: 1,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderRadius: wp(20),
    padding: wp(12),
    marginRight: wp(12),
    maxHeight: hp(100),
  },
  sendButton: {
    borderRadius: wp(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
