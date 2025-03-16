
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function QRCodeScanner({ onClose }: { onClose: () => void }) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanningMessage, setScanningMessage] = useState('Placez un QR code dans le cadre');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setScanningMessage('QR Code scanné avec succès!');
    
    // Here you would typically validate the QR code data
    // For demonstration, we'll add a timeout before navigating
    setTimeout(() => {
      onClose(); // Close scanner first
      // Ensure we navigate to tabs after a successful scan
      router.replace('/(tabs)'); // Then navigate to tabs
    }, 1500);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Demande d'autorisation de la caméra...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Pas d'accès à la caméra</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <ArrowLeft size={24} color="white" />
      </TouchableOpacity>
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.scanOverlay}>
        <View style={styles.scanFrame}>
          <View style={[styles.scanCorner, styles.topLeft]} />
          <View style={[styles.scanCorner, styles.topRight]} />
          <View style={[styles.scanCorner, styles.bottomLeft]} />
          <View style={[styles.scanCorner, styles.bottomRight]} />
        </View>
        
        <View style={styles.messageContainer}>
          <Text style={styles.scanMessage}>{scanningMessage}</Text>
        </View>
        
        {scanned && (
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setScanned(false)}
          >
            <Text style={styles.buttonText}>Scanner à nouveau</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 100,
    padding: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 0,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#60A5FA',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 10,
  },
  topRight: {
    top: 0,
    right: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 10,
  },
  messageContainer: {
    marginTop: 40,
    padding: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
  },
  scanMessage: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
