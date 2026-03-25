import { Tabs, router } from 'expo-router';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { C } from '../../lib/colors';

function FAB() {
  const [open, setOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const actions = [
    { label: 'Expense', route: '/add-expense' as const },
    { label: 'Friend',  route: '/add-friend'  as const },
    { label: 'Group',   route: '/add-group'   as const },
  ];
  return (
    <>
      {open && <View style={StyleSheet.absoluteFillObject} onTouchEnd={() => setOpen(false)} pointerEvents="box-only" />}
      <View style={[styles.fabWrap, { bottom: insets.bottom + 70 }]}>
        {open && actions.map(a => (
          <TouchableOpacity key={a.route} style={styles.miniBtn}
            onPress={() => { setOpen(false); router.push(a.route); }}>
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.mainBtn} onPress={() => setOpen(v => !v)} activeOpacity={0.85}>
          <Ionicons name={open ? 'close' : 'add'} size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default function TabLayout() {
  return (
    <>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: C.dark, borderTopWidth: 0, height: 60 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6B6059',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginBottom: 6 },
      }}>
        <Tabs.Screen name="index"   options={{ title: 'Friends',  tabBarIcon: ({ color }) => <Ionicons name="people-outline"   size={22} color={color} /> }} />
        <Tabs.Screen name="groups"  options={{ title: 'Groups',   tabBarIcon: ({ color }) => <Ionicons name="layers-outline"   size={22} color={color} /> }} />
        <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: ({ color }) => <Ionicons name="time-outline"     size={22} color={color} /> }} />
        <Tabs.Screen name="account" options={{ title: 'Account',  tabBarIcon: ({ color }) => <Ionicons name="person-outline"   size={22} color={color} /> }} />
      </Tabs>
      <FAB />
    </>
  );
}

const styles = StyleSheet.create({
  fabWrap: { position: 'absolute', right: 20, alignItems: 'center', gap: 10, zIndex: 99 },
  mainBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: C.orange, alignItems: 'center', justifyContent: 'center', shadowColor: C.orange, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8 },
  miniBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#2A1A0E', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 5 },
});
