
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
    // Improved logic for determining active tab
    return pathname === tabHref || 
      (tabHref === '/(tabs)' && (pathname === '/' || pathname === '/(tabs)/index' || pathname === '/(tabs)')) ||
      (tabHref !== '/(tabs)' && pathname.startsWith(tabHref));
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
                isActive && styles.activeTab,
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
                  isActive && { backgroundColor: `${colors.primary}20` }
                ]}
              >
                <tab.icon 
                  size={wp(24)} 
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
    paddingTop: hp(12),
    paddingBottom: Platform.OS === 'ios' ? hp(28) : hp(12),
    paddingHorizontal: wp(8),
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
    paddingVertical: hp(6),
    borderTopWidth: 3,
    borderTopColor: 'transparent',
  },
  activeTab: {
    borderRadius: wp(10),
  },
  iconContainer: {
    padding: wp(8),
    borderRadius: wp(10),
    marginBottom: hp(4),
  },
  tabText: {
    fontSize: fp(12),
    textAlign: 'center',
    marginTop: hp(2),
  }
});
