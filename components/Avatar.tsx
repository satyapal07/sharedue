import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../lib/colors';

interface Props { name: string; avatarId?: number; size?: number; }

export default function Avatar({ name, avatarId = 0, size = 36 }: Props) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const bg = name === 'You' ? C.dark : C.avatarColors[(avatarId - 1 + C.avatarColors.length) % C.avatarColors.length];
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={[styles.text, { fontSize: size * 0.33 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontWeight: '700' },
});
