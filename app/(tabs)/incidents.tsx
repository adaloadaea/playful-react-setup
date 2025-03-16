import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { CircleAlert as AlertCircle, CircleCheck as CheckCircle, Plus } from 'lucide-react-native';
import { useThemeColors } from '../../src/hooks/useThemeColors';
import { wp, hp, fp, getSafeAreaInsets } from '../../src/utils/responsive';

export default function IncidentsScreen() {
  const colors = useThemeColors();
  const safeArea = getSafeAreaInsets();

  const incidents = [
    {
      id: 1,
      title: 'Porte forcée',
      time: 'Il y a 10 minutes',
      location: 'Entrée principale - Bâtiment A',
      status: 'urgent',
      resolved: false
    },
    {
      id: 2,
      title: 'Fenêtre ouverte',
      time: 'Il y a 1 heure',
      location: '2ème étage - Bureau 204',
      status: 'resolved',
      resolved: true
    },
    {
      id: 3,
      title: 'Alarme incendie',
      time: 'Il y a 3 heures',
      location: 'Parking souterrain - Niveau 2',
      status: 'urgent',
      resolved: false
    },
    {
      id: 4,
      title: 'Camera défectueuse',
      time: 'Hier',
      location: 'Couloir est - 1er étage',
      status: 'moderate',
      resolved: false
    }
  ];

  const handleResolveIncident = (id: number) => {
    // In a real app, you would update the incident status in your backend
    console.log(`Incident resolved: ${id}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[
        styles.header, 
        { 
          backgroundColor: colors.headerBg,
          paddingTop: Platform.OS === 'ios' ? safeArea.top : StatusBar.currentHeight ? StatusBar.currentHeight + hp(10) : hp(50)
        }
      ]}>
        <Text style={[styles.title, { color: colors.text, fontSize: fp(24) }]}>Incidents</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: hp(100) }}
        showsVerticalScrollIndicator={false}
      >
        {incidents.map((incident) => (
          <View 
            key={incident.id} 
            style={[
              styles.incidentCard, 
              { backgroundColor: colors.card, shadowColor: colors.shadow }
            ]}
          >
            <View 
              style={[
                styles.statusDot, 
                incident.status === 'urgent' 
                  ? { backgroundColor: colors.danger } 
                  : incident.status === 'resolved' 
                    ? { backgroundColor: colors.success } 
                    : { backgroundColor: colors.warning }
              ]} 
            />
            <View style={styles.incidentInfo}>
              <Text style={[styles.incidentTitle, { color: colors.text, fontSize: fp(17) }]}>
                {incident.title}
              </Text>
              <Text style={[styles.incidentTime, { color: colors.textSecondary, fontSize: fp(14) }]}>
                {incident.time}
              </Text>
              <Text style={[styles.incidentLocation, { color: colors.textSecondary, fontSize: fp(14) }]}>
                {incident.location}
              </Text>
            </View>
            {!incident.resolved ? (
              <TouchableOpacity 
                style={styles.resolveButton}
                onPress={() => handleResolveIncident(incident.id)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <CheckCircle color={colors.success} size={wp(24)} />
              </TouchableOpacity>
            ) : (
              <AlertCircle color={colors.textSecondary} size={wp(24)} />
            )}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={[
          styles.addButton, 
          { 
            backgroundColor: colors.primary,
            bottom: Platform.OS === 'ios' ? safeArea.bottom + hp(20) : hp(20)
          }
        ]}
      >
        <Plus size={wp(22)} color="white" style={{ marginRight: wp(8) }} />
        <Text style={[styles.addButtonText, { color: 'white', fontSize: fp(16) }]}>
          Signaler un nouvel incident
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: wp(20),
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: wp(20),
  },
  incidentCard: {
    padding: wp(20),
    borderRadius: wp(10),
    marginBottom: hp(15),
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statusDot: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    marginRight: wp(15),
  },
  incidentInfo: {
    flex: 1,
  },
  incidentTitle: {
    fontWeight: 'bold',
    marginBottom: hp(4),
  },
  incidentTime: {
    marginTop: hp(4),
  },
  incidentLocation: {
    marginTop: hp(4),
  },
  resolveButton: {
    padding: wp(10),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: wp(20),
    right: wp(20),
    padding: wp(15),
    borderRadius: wp(8),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonText: {
    fontWeight: 'bold',
  },
});
