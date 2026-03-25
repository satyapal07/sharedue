import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../lib/colors';
import type { ExpenseCategory } from '../lib/data';

const ICON_MAP: Record<ExpenseCategory, { name: keyof typeof Ionicons.glyphMap; color: string; bg: string }> = {
  food:          { name: 'restaurant-outline',       color: '#D97706', bg: '#FEF3C7' },
  housing:       { name: 'home-outline',             color: '#2D5A8E', bg: '#DBEAFE' },
  transport:     { name: 'car-outline',              color: '#7C3AED', bg: '#EDE9FE' },
  travel:        { name: 'airplane-outline',         color: '#0891B2', bg: '#CFFAFE' },
  outdoors:      { name: 'leaf-outline',             color: '#059669', bg: '#D1FAE5' },
  fitness:       { name: 'barbell-outline',          color: '#DC2626', bg: '#FEE2E2' },
  entertainment: { name: 'film-outline',             color: '#DB2777', bg: '#FCE7F3' },
  utilities:     { name: 'flash-outline',            color: '#D97706', bg: '#FEF3C7' },
  shopping:      { name: 'bag-handle-outline',       color: '#7C3AED', bg: '#EDE9FE' },
  settlement:    { name: 'checkmark-circle-outline', color: '#059669', bg: '#D1FAE5' },
  general:       { name: 'grid-outline',             color: C.muted,   bg: C.divider },
};

interface Props { category: ExpenseCategory; size?: number; }

export default function CategoryIcon({ category, size = 36 }: Props) {
  const { name, color, bg } = ICON_MAP[category] ?? ICON_MAP.general;
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: bg }]}>
      <Ionicons name={name} size={size * 0.5} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
