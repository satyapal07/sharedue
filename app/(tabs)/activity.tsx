import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { recentActivity } from '../../lib/data';
import CategoryIcon from '../../components/CategoryIcon';
import Avatar from '../../components/Avatar';
import { C } from '../../lib/colors';

const fmt = (n: number) => `$${Math.abs(n).toFixed(2)}`;

export default function ActivityScreen() {
  const insets = useSafeAreaInsets();

  const months: string[] = [];
  const byMonth: Record<string, typeof recentActivity> = {};
  for (const item of recentActivity) {
    if (!byMonth[item.month]) { months.push(item.month); byMonth[item.month] = []; }
    byMonth[item.month].push(item);
  }

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(
    Object.fromEntries(months.map((m, i) => [m, i !== 0]))
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.header}><Text style={styles.logo}>sharedue</Text></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {months.map(month => {
          const items = byMonth[month];
          const isCollapsed = collapsed[month];
          return (
            <View key={month}>
              <TouchableOpacity style={styles.monthHeader} onPress={() => setCollapsed(p => ({ ...p, [month]: !p[month] }))}>
                <Text style={styles.monthLabel}>{month}</Text>
                <Ionicons name={isCollapsed ? 'chevron-forward' : 'chevron-down'} size={16} color={C.muted} />
              </TouchableOpacity>
              {!isCollapsed && items.map((item, idx) => {
                const isPos = item.amount > 0;
                return (
                  <View key={item.id} style={[styles.row, idx !== 0 && styles.rowBorder]}>
                    <CategoryIcon category={item.category} size={36} />
                    <View style={styles.rowContent}>
                      <View style={styles.personRow}>
                        <Avatar name={item.person} avatarId={item.avatarId} size={18} />
                        <Text style={styles.personName}>{item.person}</Text>
                      </View>
                      <Text style={styles.action}>{item.action}{item.groupName ? ` · ${item.groupName}` : ''}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={[styles.amt, { color: isPos ? C.emerald : C.orange }]}>{isPos ? '+' : '−'}{fmt(item.amount)}</Text>
                      <Text style={styles.amtLabel}>{isPos ? 'To receive' : 'To pay'}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { paddingHorizontal: 20, paddingVertical: 12 },
  logo: { fontSize: 22, fontWeight: '900', color: C.dark, letterSpacing: -0.5 },
  monthHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 },
  monthLabel: { fontSize: 11, fontWeight: '600', color: C.muted, letterSpacing: 1.5, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 14 },
  rowBorder: { borderTopWidth: 1, borderTopColor: C.divider },
  rowContent: { flex: 1, minWidth: 0 },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  personName: { fontSize: 13, fontWeight: '600', color: C.dark },
  action: { fontSize: 12, color: C.muted },
  date: { fontSize: 11, color: C.muted, marginTop: 3 },
  rowRight: { alignItems: 'flex-end' },
  amt: { fontSize: 15, fontWeight: '700' },
  amtLabel: { fontSize: 10, color: C.muted, marginTop: 1 },
});
