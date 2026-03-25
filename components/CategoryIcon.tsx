import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../lib/colors';
import type { ExpenseCategory } from '../lib/data';

const ICON_MAP: Record<ExpenseCategory, keyof typeof Ionicons.glyphMap> = {
  food:          'restaurant-outline',
  housing:       'home-outline',
  transport:     'bus-outline',
  travel:        'airplane-outline',
  outdoors:      'leaf-outline',
  fitness:       'flame-outline',
  entertainment: 'film-outline',
  utilities:     'flash-outline',
  shopping:      'bag-handle-outline',
  settlement:    'checkmark-circle-outline',
  general:       'grid-outline',
};

interface Props { category: ExpenseCategory; size?: number; }

export default function CategoryIcon({ category, size = 36 }: Props) {
  const icon = ICON_MAP[category] ?? 'grid-outline';
  return (
    <View style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}>
      <Ionicons name={icon} size={size * 0.52} color={C.dark} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { backgroundColor: C.divider, alignItems: 'center', justifyContent: 'center' },
});
