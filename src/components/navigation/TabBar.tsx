
import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Animated } from 'react-native';
import { usePathname, Link } from 'expo-router';
import { Home, AlertTriangle, MapPin, MessageSquare, Settings } from 'lucide-react-native';
import { useThemeColors } from '../../hooks/useThemeColors';
import { wp, hp, fp } from '../../utils/responsive';

export default function TabBar() {
  const pathname = usePathname();
  const colors = useThemeColors();
  
  // Animation references for each tab
  const animatedValues = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;

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

  const getActiveStatus = (tabHref: string, index: number) => {
    // Home tab
    if (tabHref === '/(tabs)' && (pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index')) {
      animateTab(index, 1);
      return true;
    }
    
    // For other tabs
    if (tabHref !== '/(tabs)') {
      // Special case for messages tab
      if (tabHref === '/(tabs)/messages' && 
          (pathname.startsWith('/(tabs)/messages') || pathname.startsWith('/messages'))) {
        animateTab(index, 1);
        return true;
      }
      
      // For incidents, map, settings
      if (pathname === tabHref || pathname.startsWith(tabHref)) {
        animateTab(index, 1);
        return true;
      }
    }
    
    animateTab(index, 0);
    return false;
  };

  const animateTab = (index: number, toValue: number) => {
    Animated.spring(animatedValues[index], {
      toValue,
      useNativeDriver: true,
      friction: 8,
      tension: 50
    }).start();
  };

  return (
    <View style={[
      styles.container, 
      { 
        backgroundColor: colors.tabBarBg, 
        borderTopColor: colors.border,
      }
    ]}>
      {tabs.map((tab, index) => {
        const isActive = getActiveStatus(tab.href, index);
        
        // Animation for the active tab
        const scale = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.15]
        });

        const translateY = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5]
        });
        
        return (
          <Link key={tab.href} href={tab.href as any} asChild>
            <TouchableOpacity 
              style={styles.tab}
              accessibilityRole="button"
              accessibilityLabel={tab.name}
              accessibilityState={{ selected: isActive }}
            >
              <Animated.View 
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isActive ? `${colors.primary}15` : 'transparent',
                    transform: [{ scale }, { translateY }],
                    borderColor: isActive ? colors.primary : 'transparent',
                  }
                ]}
              >
                <tab.icon 
                  size={wp(16)} 
                  color={isActive ? colors.primary : colors.secondary} 
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </Animated.View>
              
              <Text 
                style={[
                  styles.tabText, 
                  { 
                    color: isActive ? colors.primary : colors.secondary,
                    fontWeight: isActive ? '600' : '400',
                    opacity: isActive ? 1 : 0.8,
                  }
                ]}
                numberOfLines={1}
              >
                {tab.name}
              </Text>
              
              {isActive && (
                <View 
                  style={[
                    styles.indicator,
                    { backgroundColor: colors.primary }
                  ]}
                />
              )}
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
    paddingTop: hp(5),
    paddingBottom: Platform.OS === 'ios' ? hp(25) : hp(5),
    paddingHorizontal: wp(0),
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    width: wp(18),
    position: 'relative',
  },
  iconContainer: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
    borderWidth: 1.5,
  },
  tabText: {
    fontSize: fp(8),
    textAlign: 'center',
    marginTop: hp(0.5),
  },
  indicator: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    position: 'absolute',
    bottom: 0,
  }
});
