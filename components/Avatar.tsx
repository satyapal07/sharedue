import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../lib/colors';

// Each avatarId maps to a unique emoji character
const EMOJIS = ['🧑', '👩‍🦱', '👨‍🦳', '👩‍🦰', '🧔', '👩', '🧕', '👦'];
const COLORS = ['#D4C5B0','#C9BCA8','#BFB39E','#D4C5B0','#C9BCA8','#BFB39E','#D4C5B0','#C9BCA8'];

interface Props { name: string; avatarId?: number; size?: number; }

export default function Avatar({ name, avatarId = 0, size = 36 }: Props) {
  const idx = ((avatarId ?? 1) - 1 + EMOJIS.length) % EMOJIS.length;
  const emoji = name === 'You' ? '🧑' : EMOJIS[idx];
  const bg = name === 'You' ? C.dark : COLORS[idx];

  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Text style={{ fontSize: size * 0.58, lineHeight: size * 0.75, marginTop: size * 0.12 }}>{emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
});
