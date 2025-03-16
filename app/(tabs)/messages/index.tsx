
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';
import { MessageSquare, Search } from 'lucide-react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useThemeColors } from '../../../src/hooks/useThemeColors';
import { wp, hp, fp, getSafeAreaInsets } from '../../../src/utils/responsive';

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colors = useThemeColors();
  const safeArea = getSafeAreaInsets();

  const conversations = [
    {
      id: 1,
      name: 'Thomas Laurent',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100',
      lastMessage: 'Nouvelle ronde à effectuer sur le secteur B',
      time: '10:30',
      unread: 2,
      online: true,
      role: 'Superviseur'
    },
    {
      id: 2,
      name: 'Marie Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100',
      lastMessage: 'Rapport de la ronde terminé',
      time: '09:45',
      unread: 0,
      online: true,
      role: 'Agent'
    },
    {
      id: 3,
      name: 'Lucas Martin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100',
      lastMessage: 'Incident résolu au secteur C',
      time: 'Hier',
      unread: 0,
      online: false,
      role: 'Agent'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[
        styles.header, 
        { 
          backgroundColor: colors.headerBg,
          paddingTop: Platform.OS === 'ios' ? safeArea.top : StatusBar.currentHeight ? StatusBar.currentHeight + hp(10) : hp(50)
        }
      ]}>
        <Text style={[styles.title, { color: colors.text, fontSize: fp(24) }]}>Messages</Text>
        <View style={[styles.searchContainer, { backgroundColor: colors.inputBg }]}>
          <Search size={wp(20)} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text, fontSize: fp(16) }]}
            placeholder="Rechercher une conversation..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Rechercher des conversations"
          />
        </View>
      </View>

      <ScrollView style={styles.chatList}>
        {filteredConversations.map((conv) => (
          <TouchableOpacity 
            key={conv.id} 
            style={[styles.conversationItem, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
            onPress={() => router.push(`/messages/${conv.id}`)}
            accessibilityLabel={`Conversation avec ${conv.name}`}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri: conv.avatar }} style={styles.avatar} />
              {conv.online && <View style={[styles.onlineIndicator, { borderColor: colors.card }]} />}
            </View>
            <View style={styles.conversationInfo}>
              <View style={styles.nameContainer}>
                <Text style={[styles.userName, { color: colors.text, fontSize: fp(16) }]}>{conv.name}</Text>
                <Text style={[
                  styles.userRole, 
                  { 
                    color: colors.primary, 
                    backgroundColor: `${colors.primary}20`,
                    fontSize: fp(12),
                    paddingHorizontal: wp(10),
                    paddingVertical: hp(3)
                  }
                ]}>
                  {conv.role}
                </Text>
              </View>
              <Text 
                style={[styles.lastMessage, { color: colors.textSecondary, fontSize: fp(14) }]} 
                numberOfLines={2}
              >
                {conv.lastMessage}
              </Text>
              <Text style={[styles.messageTime, { color: colors.textSecondary, fontSize: fp(12) }]}>
                {conv.time}
              </Text>
              {conv.unread > 0 && (
                <View style={[
                  styles.unreadBadge, 
                  { 
                    backgroundColor: colors.primary,
                    width: wp(30),
                    height: wp(30),
                    borderRadius: wp(15),
                  }
                ]}>
                  <Text style={[styles.unreadCount, { color: colors.card, fontSize: fp(14) }]}>
                    {conv.unread}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredConversations.length === 0 && (
        <View style={styles.noResults}>
          <MessageSquare size={wp(40)} color={colors.textSecondary} />
          <Text style={[styles.noResultsText, { color: colors.textSecondary, fontSize: fp(16) }]}>
            Aucune conversation trouvée
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: wp(20),
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: hp(15),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(16),
    padding: wp(12),
    marginTop: hp(8),
  },
  searchIcon: {
    marginRight: wp(12),
  },
  searchInput: {
    flex: 1,
  },
  chatList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: wp(15),
    borderBottomWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
  },
  onlineIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#22C55E',
    borderWidth: 2,
  },
  conversationInfo: {
    flex: 1,
    marginLeft: wp(12),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(6),
  },
  userName: {
    fontWeight: '600',
    marginRight: wp(10),
  },
  userRole: {
    borderRadius: wp(12),
  },
  lastMessage: {
    lineHeight: fp(22),
  },
  messageTime: {
    marginTop: hp(6),
  },
  unreadBadge: {
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontWeight: 'bold',
  },
  noResults: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp(20),
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: hp(16),
  },
});
