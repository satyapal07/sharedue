import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { groups, settledGroups } from '../../lib/data';
import CategoryIcon from '../../components/CategoryIcon';
import { C } from '../../lib/colors';
import Logo from '../../components/Logo';

const fmt = (n: number) => `$${Math.abs(n).toFixed(2)}`;
type Filter = 'all' | 'to-pay' | 'to-receive';
const FILTERS = [{ value: 'all' as Filter, label: 'All' }, { value: 'to-pay' as Filter, label: 'To pay' }, { value: 'to-receive' as Filter, label: 'To receive' }];

export default function GroupsScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showSettled, setShowSettled] = useState(false);

  const totalOwed = groups.filter(g => g.balance < 0).reduce((s, g) => s + g.balance, 0);
  const totalOwing = groups.filter(g => g.balance > 0).reduce((s, g) => s + g.balance, 0);
  const net = groups.reduce((s, g) => s + g.balance, 0);
  const isFiltered = filter !== 'all' || search.trim() !== '';

  const filtered = groups.filter(g => {
    const matchFilter = filter === 'all' || (filter === 'to-pay' && g.balance < 0) || (filter === 'to-receive' && g.balance > 0);
    return matchFilter && g.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Logo />
        <TouchableOpacity onPress={() => setFilterOpen(true)} style={[styles.filterBtn, isFiltered && styles.filterBtnActive]}>
          <Ionicons name="options-outline" size={16} color={isFiltered ? '#fff' : C.muted} />
          {isFiltered && <View style={styles.dot} />}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total balance</Text>
          <Text style={styles.cardAmount}>{fmt(net)}</Text>
          <View style={styles.cardRow}>
            <View style={styles.cardHalf}><Text style={[styles.cardSubLabel, { color: C.orange }]}>TO PAY</Text><Text style={styles.cardSubAmt}>{fmt(totalOwed)}</Text></View>
            <View style={styles.cardHalf}><Text style={[styles.cardSubLabel, { color: '#34d399' }]}>TO RECEIVE</Text><Text style={styles.cardSubAmt}>{fmt(totalOwing)}</Text></View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Open balances</Text>
        {filtered.map((group, idx) => {
          const isOwed = group.balance > 0;
          return (
            <TouchableOpacity key={group.id} onPress={() => router.push(`/groups/${group.id}`)}
              style={[styles.row, idx !== 0 && styles.rowBorder]}>
              <CategoryIcon category={group.category} size={36} />
              <View style={styles.rowContent}>
                <Text style={styles.rowName}>{group.name}</Text>
                <Text style={styles.rowSub}>{group.memberCount} people</Text>
                {group.breakdown?.map(b => (
                  <Text key={b.name} style={styles.breakdown}>
                    {b.amount < 0 ? `Owe ${b.name} ${fmt(b.amount)}` : `${b.name} owes ${fmt(b.amount)}`}
                  </Text>
                ))}
              </View>
              <View style={styles.rowRight}>
                <Text style={[styles.rowAmt, { color: isOwed ? C.emerald : C.orange }]}>{isOwed ? '+' : '−'}{fmt(group.balance)}</Text>
                <Text style={styles.rowLabel}>{isOwed ? 'To receive' : 'To pay'}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {filtered.length === 0 && <Text style={styles.empty}>No groups match.</Text>}

        <TouchableOpacity style={styles.settledBtn} onPress={() => setShowSettled(v => !v)}>
          <Text style={styles.settledBtnText}>{showSettled ? 'Hide settled groups' : 'Show settled groups'}</Text>
        </TouchableOpacity>
        {showSettled && settledGroups.map((g, idx) => (
          <View key={g.id} style={[styles.row, idx !== 0 && styles.rowBorder]}>
            <CategoryIcon category={g.category} size={36} />
            <View style={styles.rowContent}><Text style={styles.rowName}>{g.name}</Text><Text style={styles.rowSub}>{g.memberCount} people · Settled up</Text></View>
            <Text style={styles.rowAmtMuted}>$0.00</Text>
          </View>
        ))}
      </ScrollView>

      <Modal visible={filterOpen} transparent animationType="slide" onRequestClose={() => setFilterOpen(false)}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => setFilterOpen(false)} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.handle} />
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color={C.muted} />
            <TextInput value={search} onChangeText={setSearch} placeholder="Search groups…" placeholderTextColor={C.mutedLight} style={styles.searchInput} />
            {search ? <TouchableOpacity onPress={() => setSearch('')}><Ionicons name="close" size={16} color={C.muted} /></TouchableOpacity> : null}
          </View>
          <Text style={styles.showLabel}>Show</Text>
          <View style={styles.tabsRow}>
            {FILTERS.map(f => (
              <TouchableOpacity key={f.value} style={[styles.tab, filter === f.value && styles.tabActive]}
                onPress={() => { setFilter(f.value); setFilterOpen(false); }}>
                <Text style={[styles.tabText, filter === f.value && styles.tabTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  logo: { fontSize: 22, fontWeight: '900', color: C.dark, letterSpacing: -0.5 },
  filterBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: C.divider, alignItems: 'center', justifyContent: 'center' },
  filterBtnActive: { backgroundColor: C.dark },
  dot: { position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: C.orange },
  card: { marginHorizontal: 20, marginBottom: 20, backgroundColor: C.dark, borderRadius: 24, padding: 20 },
  cardLabel: { fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 },
  cardAmount: { fontSize: 44, fontWeight: '900', color: '#fff', letterSpacing: -1, marginBottom: 14 },
  cardRow: { flexDirection: 'row', gap: 12 },
  cardHalf: { flex: 1, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 12 },
  cardSubLabel: { fontSize: 10, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 2 },
  cardSubAmt: { fontSize: 18, fontWeight: '700', color: '#fff' },
  sectionLabel: { paddingHorizontal: 20, marginBottom: 8, fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14 },
  rowBorder: { borderTopWidth: 1, borderTopColor: C.divider },
  rowContent: { flex: 1, minWidth: 0 },
  rowName: { fontSize: 15, fontWeight: '600', color: C.dark },
  rowSub: { fontSize: 12, color: C.muted, marginTop: 1 },
  breakdown: { fontSize: 11, color: C.muted, marginTop: 1 },
  rowRight: { alignItems: 'flex-end' },
  rowAmt: { fontSize: 15, fontWeight: '700' },
  rowAmtMuted: { fontSize: 13, fontWeight: '600', color: C.muted },
  rowLabel: { fontSize: 10, color: C.muted, marginTop: 1 },
  empty: { textAlign: 'center', color: C.muted, fontSize: 14, paddingVertical: 40 },
  settledBtn: { marginHorizontal: 20, marginTop: 16, paddingVertical: 14, borderRadius: 24, borderWidth: 1, borderColor: C.divider, alignItems: 'center' },
  settledBtnText: { fontSize: 13, fontWeight: '600', color: C.muted },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { backgroundColor: C.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20 },
  handle: { width: 40, height: 4, backgroundColor: C.divider, borderRadius: 2, alignSelf: 'center', marginBottom: 24 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: C.bg, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 15, color: C.dark },
  showLabel: { fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  tabsRow: { flexDirection: 'row', gap: 8 },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 50, backgroundColor: '#F0EBE5', alignItems: 'center' },
  tabActive: { backgroundColor: C.dark },
  tabText: { fontSize: 14, fontWeight: '600', color: C.muted },
  tabTextActive: { color: '#fff' },
});
