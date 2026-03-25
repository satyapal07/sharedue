import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../lib/colors';

export default function AddFriend() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function handleSend() {
    setSent(true);
    setTimeout(() => router.back(), 1500);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={C.muted} />
        </TouchableOpacity>
        <Text style={styles.title}>Add friend</Text>
        <View style={{ width: 36 }} />
      </View>
      <View style={styles.body}>
        <Text style={styles.heading}>Invite a friend</Text>
        <Text style={styles.sub}>They'll get an email to join and split expenses with you.</Text>
        <Text style={styles.label}>Name (optional)</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Alex Chen" placeholderTextColor={C.mutedLight} style={styles.input} />
        <Text style={[styles.label, { marginTop: 16 }]}>Email address</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="friend@email.com" placeholderTextColor={C.mutedLight} keyboardType="email-address" autoCapitalize="none" style={styles.input} />
        <TouchableOpacity onPress={handleSend} disabled={!validEmail || sent}
          style={[styles.btn, (!validEmail || sent) && styles.btnDisabled, sent && styles.btnSent]}>
          <Text style={[styles.btnText, !validEmail && !sent && { color: C.muted }]}>
            {sent ? 'Invite sent ✓' : 'Send invite'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.divider, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 13, fontWeight: '600', color: C.muted },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  heading: { fontSize: 24, fontWeight: '900', color: C.dark, letterSpacing: -0.5, marginBottom: 6 },
  sub: { fontSize: 14, color: C.muted, marginBottom: 24, lineHeight: 20 },
  label: { fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  input: { backgroundColor: C.white, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: C.dark, marginBottom: 4 },
  btn: { marginTop: 28, paddingVertical: 16, borderRadius: 24, backgroundColor: C.dark, alignItems: 'center' },
  btnDisabled: { backgroundColor: C.divider },
  btnSent: { backgroundColor: C.emerald },
  btnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
