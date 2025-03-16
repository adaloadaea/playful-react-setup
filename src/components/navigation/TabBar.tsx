
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from 'react-native';
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
    // Home tab
    if (tabHref === '/(tabs)' && (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index')) {
      return true;
    }
    
    // For other tabs
    if (tabHref !== '/(tabs)') {
      // Special case for messages tab
      if (tabHref === '/(tabs)/messages' && 
          (pathname.startsWith('/(tabs)/messages') || pathname.startsWith('/messages'))) {
        return true;
      }
      
      // For incidents, map, settings
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
              ]}
              accessibilityRole="button"
              accessibilityLabel={tab.name}
              accessibilityState={{ selected: isActive }}
            >
              <View 
                style={[
                  styles.iconContainer, 
                  isActive ? styles.activeIconContainer : styles.inactiveIconContainer,
                  { backgroundColor: isActive ? `${colors.primary}20` : 'transparent' }
                ]}
              >
                <tab.icon 
                  size={wp(20)} 
                  color={isActive ? colors.primary : colors.secondary} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <View 
                    style={[
                      styles.activeDot,
                      { backgroundColor: colors.primary }
                    ]} 
                  />
                )}
              </View>
              <Text 
                style={[
                  styles.tabText, 
                  { 
                    color: isActive ? colors.primary : colors.secondary,
                    fontWeight: isActive ? '600' : '400',
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
    paddingTop: hp(8),
    paddingBottom: Platform.OS === 'ios' ? hp(25) : hp(8),
    paddingHorizontal: wp(5),
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
    paddingVertical: hp(3),
    paddingHorizontal: wp(2),
  },
  iconContainer: {
    width: wp(42),
    height: wp(42),
    borderRadius: wp(21),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  activeIconContainer: {
    transform: [{ translateY: hp(-4) }],
  },
  inactiveIconContainer: {
    transform: [{ translateY: 0 }],
  },
  activeDot: {
    position: 'absolute',
    bottom: -hp(2),
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
  },
  tabText: {
    fontSize: fp(10),
    textAlign: 'center',
    marginTop: hp(1),
  }
});
