import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../lib/colors';

export default function Logo() {
  return (
    <View style={styles.row}>
      {/* Orange pill icon */}
      <View style={styles.icon}>
        <View style={styles.iconInner} />
      </View>
      <Text style={styles.wordmark}>
        share<Text style={{ color: C.orange }}>due</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  icon: { width: 32, height: 32, borderRadius: 8, backgroundColor: C.dark, alignItems: 'center', justifyContent: 'center' },
  iconInner: { width: 18, height: 18, borderRadius: 5, backgroundColor: C.orange },
  wordmark: { fontSize: 22, fontWeight: '900', color: C.dark, letterSpacing: -0.5 },
});
