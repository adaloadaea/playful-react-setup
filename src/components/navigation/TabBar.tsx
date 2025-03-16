
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { usePathname, Link } from 'expo-router';
import { Home, AlertTriangle, MapPin, MessageSquare, Settings } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import { wp, hp, fp } from '../../utils/responsive';

export default function TabBar() {
  const pathname = usePathname();
  const colors = useThemeColors();

  const tabs = [
    {
      name: 'Accueil',
      href: '/(tabs)',
      icon: Home,
    },
    {
      name: 'Incidents',
      href: '/(tabs)/incidents',
      icon: AlertTriangle,
    },
    {
      name: 'Carte',
      href: '/(tabs)/map',
      icon: MapPin,
    },
    {
      name: 'Messages',
      href: '/(tabs)/messages',
      icon: MessageSquare,
    },
    {
      name: 'Réglages',
      href: '/(tabs)/settings',
      icon: Settings,
    },
  ];

  const getActiveStatus = (tabHref: string) => {
    // Simple path matching for better active tab detection
    if (tabHref === '/(tabs)' && (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index')) {
      return true;
    }
    
    // For other tabs, check if the current path starts with the tab href
    if (tabHref !== '/(tabs)') {
      // Special case for messages tab to handle nested routes
      if (tabHref === '/(tabs)/messages' && 
         (pathname.startsWith('/(tabs)/messages') || pathname.startsWith('/messages'))) {
        return true;
      }
      
      // For other tabs
      return pathname === tabHref || pathname.startsWith(tabHref);
    }
    
    return false;
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.tabBarBg, 
        borderTopColor: colors.border,
        shadowColor: colors.shadow
      }
    ]}>
      {tabs.map((tab) => {
        const isActive = getActiveStatus(tab.href);
        
        return (
          <Link key={tab.href} href={tab.href as any} asChild>
            <TouchableOpacity 
              style={[
                styles.tab,
                isActive && { 
                  backgroundColor: `${colors.primary}15`,
                  borderTopColor: colors.primary,
                  borderTopWidth: 3,
                }
              ]}
              accessibilityRole="button"
              accessibilityLabel={tab.name}
              accessibilityState={{ selected: isActive }}
            >
              <View 
                style={[
                  styles.iconContainer, 
                  isActive && { backgroundColor: `${colors.primary}30` }
                ]}
              >
                <tab.icon 
                  size={wp(22)} 
                  color={isActive ? colors.primary : colors.secondary} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </View>
              <Text 
                style={[
                  styles.tabText, 
                  { color: colors.secondary },
                  isActive && { 
                    color: colors.primary,
                    fontWeight: '600',
                  }
                ]}
                numberOfLines={1}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: hp(10),
    paddingBottom: Platform.OS === 'ios' ? hp(25) : hp(10),
    paddingHorizontal: wp(4), // Reduced horizontal padding
    justifyContent: 'space-between',
    borderTopWidth: 1,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(4), // Reduced vertical padding
    paddingHorizontal: wp(2), // Reduced horizontal padding for each tab
    borderTopWidth: 3,
    borderTopColor: 'transparent',
  },
  iconContainer: {
    padding: wp(6), // Smaller padding for icon container
    borderRadius: wp(8),
    marginBottom: hp(2), // Reduced margin
  },
  tabText: {
    fontSize: fp(11), // Slightly smaller text
    textAlign: 'center',
    marginTop: hp(1), // Reduced margin
  }
});
