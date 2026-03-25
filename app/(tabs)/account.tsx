import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../components/Avatar';
import { C } from '../../lib/colors';
import Logo from '../../components/Logo';

const SETTINGS: {section:string;items:{label:string;value?:string;icon:string}[]}[] = [
  { section: 'Preferences', items: [
    { label: 'Currency', value: 'USD ($)', icon: 'cash-outline' },
    { label: 'Notifications', value: 'On', icon: 'notifications-outline' },
    { label: 'Default split', value: 'Equally', icon: 'git-branch-outline' },
  ]},
  { section: 'Account', items: [
    { label: 'Privacy', icon: 'lock-closed-outline' },
    { label: 'Export data', icon: 'download-outline' },
    { label: 'Help & support', icon: 'help-circle-outline' },
  ]},
];

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}><Logo /></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.profile}>
          <Avatar name="You" avatarId={1} size={64} />
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.profileName}>You</Text>
            <Text style={styles.profileEmail}>you@email.com</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[['Friends', '6'],['Groups', '5'],['Expenses', '19']].map(([label, val]) => (
            <View key={label} style={styles.stat}>
              <Text style={styles.statVal}>{val}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {SETTINGS.map(section => (
          <View key={section.section}>
            <Text style={styles.sectionLabel}>{section.section}</Text>
            {section.items.map((item, idx) => (
              <TouchableOpacity key={item.label} style={[styles.settingRow, idx !== 0 && styles.rowBorder]}>
                <View style={styles.settingIcon}><Ionicons name={item.icon as any} size={18} color={C.muted} /></View>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                  <Ionicons name="chevron-forward" size={14} color={C.muted} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.signOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingVertical: 12 },
  logo: { fontSize: 22, fontWeight: '900', color: C.dark, letterSpacing: -0.5 },
  profile: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: C.divider },
  profileName: { fontSize: 18, fontWeight: '700', color: C.dark },
  profileEmail: { fontSize: 13, color: C.muted, marginTop: 2 },
  statsRow: { flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: C.divider },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 22, fontWeight: '800', color: C.dark },
  statLabel: { fontSize: 11, color: C.muted, marginTop: 2 },
  sectionLabel: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8, fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 12 },
  rowBorder: { borderTopWidth: 1, borderTopColor: C.divider },
  settingIcon: { width: 32, height: 32, borderRadius: 8, backgroundColor: C.divider, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { flex: 1, fontSize: 15, color: C.dark },
  settingValue: { fontSize: 13, color: C.muted },
  signOut: { marginHorizontal: 20, marginTop: 32, paddingVertical: 14, borderRadius: 24, borderWidth: 1, borderColor: C.divider, alignItems: 'center' },
  signOutText: { fontSize: 13, fontWeight: '600', color: C.muted },
});
