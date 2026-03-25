import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { friends, getCategoryFromText } from '../lib/data';
import Avatar from '../components/Avatar';
import CategoryIcon from '../components/CategoryIcon';
import { C } from '../lib/colors';

export default function AddGroup() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [done, setDone] = useState(false);

  const category = getCategoryFromText(name);
  const canCreate = name.trim().length > 0 && selected.length > 0;

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={C.muted} />
        </TouchableOpacity>
        <Text style={styles.title}>Create group</Text>
        <View style={{ width: 36 }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>
        <View style={styles.nameRow}>
          {name.trim() && <CategoryIcon category={category} size={36} />}
          <TextInput value={name} onChangeText={setName} placeholder="Group name…" placeholderTextColor={C.mutedLight} style={[styles.nameInput, name.trim() && { flex: 1 }]} />
        </View>

        <Text style={styles.label}>Add friends</Text>
        {friends.map((f, idx) => (
          <TouchableOpacity key={f.id} onPress={() => toggle(f.id)} style={[styles.row, idx !== 0 && styles.rowBorder]}>
            <Avatar name={f.name} avatarId={f.avatarId} size={36} />
            <Text style={[styles.rowName, { flex: 1 }]}>{f.name}</Text>
            <View style={[styles.check, selected.includes(f.id) && styles.checkActive]}>
              {selected.includes(f.id) && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={() => setInviteOpen(v => !v)} style={styles.inviteToggle}>
          <Ionicons name={inviteOpen ? 'chevron-down' : 'add-circle-outline'} size={18} color={C.muted} />
          <Text style={styles.inviteToggleText}>Invite someone new</Text>
        </TouchableOpacity>
        {inviteOpen && (
          <View style={styles.inviteForm}>
            <TextInput value={inviteName} onChangeText={setInviteName} placeholder="Name (optional)" placeholderTextColor={C.mutedLight} style={styles.input} />
            <TextInput value={inviteEmail} onChangeText={setInviteEmail} placeholder="Email address" placeholderTextColor={C.mutedLight} keyboardType="email-address" autoCapitalize="none" style={[styles.input, { marginTop: 8 }]} />
          </View>
        )}

        <TouchableOpacity onPress={() => { setDone(true); setTimeout(() => router.back(), 1500); }} disabled={!canCreate || done}
          style={[styles.createBtn, (!canCreate || done) && styles.createBtnDisabled, done && styles.createBtnDone]}>
          <Text style={[styles.createBtnText, !canCreate && !done && { color: C.muted }]}>
            {done ? 'Group created ✓' : `Create group${selected.length > 0 ? ` · ${selected.length + 1} members` : ''}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.divider, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 13, fontWeight: '600', color: C.muted },
  body: { paddingHorizontal: 20, paddingBottom: 80 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.white, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 4, marginBottom: 24 },
  nameInput: { flex: 1, fontSize: 18, fontWeight: '700', color: C.dark, paddingVertical: 14 },
  label: { fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14 },
  rowBorder: { borderTopWidth: 1, borderTopColor: C.divider },
  rowName: { fontSize: 15, fontWeight: '600', color: C.dark },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: C.divider, alignItems: 'center', justifyContent: 'center' },
  checkActive: { backgroundColor: C.dark, borderColor: C.dark },
  inviteToggle: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 14, borderTopWidth: 1, borderTopColor: C.divider },
  inviteToggleText: { fontSize: 14, fontWeight: '600', color: C.muted },
  inviteForm: { paddingBottom: 8 },
  input: { backgroundColor: C.white, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: C.dark },
  createBtn: { marginTop: 24, paddingVertical: 16, borderRadius: 24, backgroundColor: C.dark, alignItems: 'center' },
  createBtnDisabled: { backgroundColor: C.divider },
  createBtnDone: { backgroundColor: C.emerald },
  createBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
