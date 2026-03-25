import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { friends, friendExpenses } from '../../lib/data';
import Avatar from '../../components/Avatar';
import CategoryIcon from '../../components/CategoryIcon';
import { C } from '../../lib/colors';

const fmt = (n: number) => `$${Math.abs(n).toFixed(2)}`;

export default function FriendDetail() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const friend = friends.find(f => f.id === id);
  if (!friend) return null;

  const expenses = friendExpenses[id] ?? [];
  const months: string[] = [];
  const byMonth: Record<string, typeof expenses> = {};
  for (const e of expenses) {
    if (!byMonth[e.month]) { months.push(e.month); byMonth[e.month] = []; }
    byMonth[e.month].push(e);
  }
  const isOwed = friend.balance > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={C.muted} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{friend.name}</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <View style={styles.profile}>
          <Avatar name={friend.name} avatarId={friend.avatarId} size={64} />
          <Text style={styles.name}>{friend.name}</Text>
          <Text style={[styles.balance, { color: isOwed ? C.emerald : C.orange }]}>
            {isOwed ? 'Owes you ' : 'You owe '}{fmt(friend.balance)}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: C.dark }]}>
            <Text style={[styles.actionText, { color: '#fff' }]}>Settle up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: C.divider }]}>
            <Text style={[styles.actionText, { color: C.dark }]}>Remind</Text>
          </TouchableOpacity>
        </View>

        {months.map(month => (
          <View key={month}>
            <Text style={styles.monthLabel}>{month}</Text>
            {byMonth[month].map((exp, idx) => {
              const isPos = exp.yourShare > 0;
              return (
                <View key={exp.id} style={[styles.row, idx !== 0 && styles.rowBorder]}>
                  <CategoryIcon category={exp.category} size={36} />
                  <View style={styles.rowContent}>
                    <Text style={styles.expDesc}>{exp.description}</Text>
                    <Text style={styles.expMeta}>{exp.paidBy} paid · {fmt(exp.totalAmount)} total</Text>
                    <Text style={styles.expDate}>{exp.date}</Text>
                  </View>
                  <View style={styles.rowRight}>
                    <Text style={[styles.expAmt, { color: isPos ? C.emerald : C.orange }]}>{isPos ? '+' : '−'}{fmt(exp.yourShare)}</Text>
                    <Text style={styles.expAmtLabel}>{isPos ? 'Owed to you' : 'You owe'}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.divider, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 15, fontWeight: '600', color: C.muted },
  profile: { alignItems: 'center', paddingVertical: 24 },
  name: { fontSize: 22, fontWeight: '800', color: C.dark, marginTop: 12 },
  balance: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 24 },
  actionBtn: { flex: 1, paddingVertical: 14, borderRadius: 20, alignItems: 'center' },
  actionText: { fontSize: 14, fontWeight: '600' },
  monthLabel: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8, fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14 },
  rowBorder: { borderTopWidth: 1, borderTopColor: C.divider },
  rowContent: { flex: 1, minWidth: 0 },
  expDesc: { fontSize: 15, fontWeight: '600', color: C.dark },
  expMeta: { fontSize: 12, color: C.muted, marginTop: 1 },
  expDate: { fontSize: 11, color: C.muted, marginTop: 2 },
  rowRight: { alignItems: 'flex-end' },
  expAmt: { fontSize: 15, fontWeight: '700' },
  expAmtLabel: { fontSize: 10, color: C.muted, marginTop: 1 },
});
