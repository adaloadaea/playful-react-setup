import React, { useState, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Platform, 
  KeyboardAvoidingView, 
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Modal,
  ScrollView
} from 'react-native';
import { router } from 'expo-router';
import { Lock, Mail, QrCode, Eye, EyeOff, Moon, Sun } from 'lucide-react-native';
import QRCodeScanner from '../../src/components/auth/QRCodeScanner';
import { wp, hp, fp } from '../../src/utils/responsive';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { useTheme } from '../../src/contexts/ThemeContext';

interface InputProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  onRightIconPress?: () => void;
  rightIcon?: React.ReactNode;
  testID?: string;
}

const Input = ({ 
  icon, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry, 
  keyboardType = 'default',
  onRightIconPress,
  rightIcon,
  testID
}: InputProps) => {
  const colors = useThemeColors();
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View 
      style={[
        styles.inputContainer, 
        { 
          backgroundColor: colors.loginInputBg,
          borderColor: isFocused ? colors.primary : 'transparent',
          borderWidth: 1,
        }
      ]}
      testID={testID}
    >
      {icon}
      <TextInput
        style={[
          styles.input, 
          { 
            color: colors.text,
            flex: 1,
          }
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
      />
      {rightIcon && (
        <TouchableOpacity 
          onPress={onRightIconPress} 
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

const Button = ({ 
  onPress, 
  title, 
  backgroundColor, 
  textColor,
  icon
}: { 
  onPress: () => void; 
  title: string; 
  backgroundColor: string; 
  textColor: string;
  icon?: React.ReactNode;
}) => {
  const animatedScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={[
          styles.button,
          { 
            backgroundColor,
            transform: [{ scale: animatedScale }]
          },
        ]}
      >
        {icon && <View style={styles.buttonIcon}>{icon}</View>}
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  
  const colors = useThemeColors();
  const { theme, toggleTheme } = useTheme();
  
  const handleLogin = useCallback(() => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    // Navigate to tabs after successful login
    router.replace('/(tabs)');
  }, [email, password]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      
      {/* Theme toggle button */}
      <TouchableOpacity 
        style={[
          styles.themeToggle, 
          { backgroundColor: theme === 'dark' ? colors.card : colors.background }
        ]}
        onPress={toggleTheme}
        accessibilityLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon size={wp(20)} color={colors.primary} />
        ) : (
          <Sun size={wp(20)} color={colors.primary} />
        )}
      </TouchableOpacity>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.innerContainer}>
              <View style={styles.headerSection}>
                <View style={[
                  styles.logoContainer,
                  { backgroundColor: colors.loginHeaderBg }
                ]}>
                  <Image 
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2031/2031434.png' }}
                    style={styles.appLogo}
                  />
                  <Text style={styles.appName}>SecuRounds</Text>
                  <Text style={styles.appTagline}>Gestion de rondes de sécurité</Text>
                </View>
              </View>
              
              <View style={[
                styles.formSection,
                { backgroundColor: colors.loginCardBg }
              ]}>
                <View style={styles.spacer} />
                
                <Text style={[styles.welcomeText, { color: colors.text }]}>
                  Bienvenue
                </Text>
                <Text style={[styles.loginText, { color: colors.textSecondary }]}>
                  Connectez-vous à votre compte
                </Text>
                
                {error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}
                
                <View style={styles.formFields}>
                  <Input 
                    icon={<Mail size={wp(20)} color={colors.textSecondary} />}
                    placeholder="Entrez votre email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    testID="email-input"
                  />
                  
                  <Input 
                    icon={<Lock size={wp(20)} color={colors.textSecondary} />}
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    rightIcon={
                      showPassword ? 
                        <EyeOff size={wp(20)} color={colors.textSecondary} /> : 
                        <Eye size={wp(20)} color={colors.textSecondary} />
                    }
                    onRightIconPress={togglePasswordVisibility}
                    testID="password-input"
                  />
                  
                  <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                      Mot de passe oublié?
                    </Text>
                  </TouchableOpacity>
                  
                  <Button 
                    title="Se connecter"
                    onPress={handleLogin}
                    backgroundColor={colors.loginButtonBg}
                    textColor={colors.loginButtonText}
                  />
                  
                  <View style={styles.divider}>
                    <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                    <Text style={[styles.dividerText, { color: colors.textSecondary }]}>ou</Text>
                    <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                  </View>
                  
                  <Button 
                    title="Scanner un QR code"
                    onPress={() => setShowQRScanner(true)}
                    backgroundColor={colors.loginSecondaryButtonBg}
                    textColor={colors.loginSecondaryButtonText}
                    icon={<QrCode size={wp(20)} color={colors.loginSecondaryButtonText} />}
                  />
                </View>
                
                <View style={styles.bottomSpacer} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      
      <Modal
        visible={showQRScanner}
        animationType="slide"
        onRequestClose={() => setShowQRScanner(false)}
      >
        <QRCodeScanner onClose={() => setShowQRScanner(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flexGrow: 1,
  },
  headerSection: {
    height: hp(200),
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    width: wp(60),
    height: wp(60),
    tintColor: 'white',
  },
  appName: {
    fontSize: fp(28),
    fontWeight: 'bold',
    color: 'white',
    marginTop: hp(10),
  },
  appTagline: {
    fontSize: fp(14),
    color: '#E2E8F0',
    marginTop: hp(5),
  },
  formSection: {
    flex: 1,
    borderTopLeftRadius: wp(30),
    borderTopRightRadius: wp(30),
    marginTop: hp(-30),
    paddingHorizontal: wp(20),
    paddingTop: hp(30),
    paddingBottom: hp(20),
  },
  spacer: {
    height: hp(20),
  },
  welcomeText: {
    fontSize: fp(24),
    fontWeight: 'bold',
    marginBottom: hp(6),
  },
  loginText: {
    fontSize: fp(14),
    marginBottom: hp(24),
  },
  formFields: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(10),
    paddingHorizontal: wp(15),
    paddingVertical: hp(12),
    marginBottom: hp(16),
  },
  input: {
    marginLeft: wp(10),
    fontSize: fp(15),
  },
  button: {
    borderRadius: wp(10),
    paddingVertical: hp(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: fp(16),
  },
  buttonIcon: {
    marginRight: wp(10),
  },
  errorContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: wp(10),
    padding: wp(10),
    marginBottom: hp(16),
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: fp(14),
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: hp(16),
  },
  forgotPasswordText: {
    fontSize: fp(14),
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(16),
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: wp(16),
    fontSize: fp(14),
  },
  themeToggle: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp(50) : hp(40),
    right: wp(20),
    zIndex: 10,
    padding: wp(10),
    borderRadius: wp(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomSpacer: {
    height: hp(30),
  },
});

export default LoginScreen;
