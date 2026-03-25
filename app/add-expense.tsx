import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { friends, groups, groupMembers, getCategoryFromText, type ExpenseCategory } from '../lib/data';
import Avatar from '../components/Avatar';
import CategoryIcon from '../components/CategoryIcon';
import { C } from '../lib/colors';

type WithType = { kind: 'friend'; id: string } | { kind: 'group'; id: string } | null;
const ALL_CATS: ExpenseCategory[] = ['food','housing','transport','travel','outdoors','fitness','entertainment','utilities','shopping','general'];
const CAT_LABELS: Record<ExpenseCategory, string> = { food:'Food & drink',housing:'Housing',transport:'Transport',travel:'Travel',outdoors:'Outdoors',fitness:'Fitness',entertainment:'Entertainment',utilities:'Utilities',shopping:'Shopping',settlement:'Settlement',general:'Miscellaneous' };
const STEPS = ['With who', 'Details', 'Split'];

const fmt = (n: number) => `$${Math.abs(n).toFixed(2)}`;

export default function AddExpense() {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [withWho, setWithWho] = useState<WithType>(null);
  const [withSearch, setWithSearch] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('You');
  const [category, setCategory] = useState<ExpenseCategory>('general');
  const [catOpen, setCatOpen] = useState(false);
  const [customCat, setCustomCat] = useState('');
  const [splitType, setSplitType] = useState<'equal'|'amount'|'percent'>('equal');
  const [customAmounts, setCustomAmounts] = useState<Record<string,string>>({});
  const [percentAmts, setPercentAmts] = useState<Record<string,string>>({});
  const [done, setDone] = useState(false);

  const selFriend = withWho?.kind === 'friend' ? friends.find(f => f.id === withWho.id) : null;
  const selGroup  = withWho?.kind === 'group'  ? groups.find(g => g.id === withWho.id)  : null;
  const parsed = parseFloat(amount) || 0;
  const memberCount = selGroup ? selGroup.memberCount : 2;
  const share = parsed / memberCount;
  const withLabel = selFriend?.name ?? selGroup?.name ?? '';
  const members = withWho?.kind === 'group' && groupMembers[withWho.id] ? groupMembers[withWho.id]
    : withWho?.kind === 'friend' && selFriend ? ['You', selFriend.name] : ['You'];
  const custTotal = members.reduce((s,m) => s + (parseFloat(customAmounts[m]||'0')||0), 0);
  const custValid = Math.abs(parsed - custTotal) < 0.01;
  const pctTotal  = members.reduce((s,m) => s + (parseFloat(percentAmts[m]||'0')||0), 0);
  const pctValid  = Math.abs(100 - pctTotal) < 0.01;
  const step1Valid = description.trim().length > 0 && parsed > 0;
  const step2Valid = splitType==='equal' || (splitType==='amount'&&custValid) || (splitType==='percent'&&pctValid);

  const ff = friends.filter(f => f.name.toLowerCase().includes(withSearch.toLowerCase()));
  const fg = groups.filter(g => g.name.toLowerCase().includes(withSearch.toLowerCase()));

  function pickWith(w: WithType) { setWithWho(w); setPaidBy('You'); setStep(1); }
  function handleDesc(v: string) { setDescription(v); if (v.trim()) setCategory(getCategoryFromText(v)); }
  const ini = (n: string) => n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => step > 0 ? setStep(step-1) : router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={C.muted} />
        </TouchableOpacity>
        <Text style={styles.title}>Add expense</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Step indicator */}
      <View style={styles.steps}>
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            <View style={styles.stepItem}>
              <View style={[styles.stepDot, i < step ? styles.stepDone : i === step ? styles.stepActive : styles.stepPending]}>
                {i < step ? <Ionicons name="checkmark" size={10} color="#fff" /> : <Text style={[styles.stepNum, i===step&&{color:'#fff'}]}>{i+1}</Text>}
              </View>
              <Text style={[styles.stepLabel, i===step ? {color:C.dark} : {color:C.muted,opacity:0.5}]}>{label}</Text>
            </View>
            {i < STEPS.length-1 && <View style={[styles.stepLine, i < step && styles.stepLineDone]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.body}>

        {/* Step 0 */}
        {step === 0 && <>
          <Text style={styles.heading}>With who?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={16} color={C.muted} />
            <TextInput value={withSearch} onChangeText={setWithSearch} placeholder="Search friends or groups…" placeholderTextColor={C.mutedLight} style={styles.searchInput} />
            {withSearch ? <TouchableOpacity onPress={()=>setWithSearch('')}><Ionicons name="close" size={16} color={C.muted}/></TouchableOpacity> : null}
          </View>
          {ff.length > 0 && <><Text style={styles.sectionLabel}>Friends</Text>
            {ff.map((f,i)=>(
              <TouchableOpacity key={f.id} onPress={()=>pickWith({kind:'friend',id:f.id})} style={[styles.row, i!==0&&styles.rowBorder]}>
                <Avatar name={f.name} avatarId={f.avatarId} size={36} />
                <Text style={styles.rowName}>{f.name}</Text>
                <Ionicons name="chevron-forward" size={16} color={C.mutedLight} />
              </TouchableOpacity>
            ))}</>}
          {fg.length > 0 && <><Text style={styles.sectionLabel}>Groups</Text>
            {fg.map((g,i)=>(
              <TouchableOpacity key={g.id} onPress={()=>pickWith({kind:'group',id:g.id})} style={[styles.row, i!==0&&styles.rowBorder]}>
                <CategoryIcon category={g.category} size={36} />
                <View style={{flex:1}}><Text style={styles.rowName}>{g.name}</Text><Text style={styles.rowSub}>{g.memberCount} people</Text></View>
                <Ionicons name="chevron-forward" size={16} color={C.mutedLight} />
              </TouchableOpacity>
            ))}</>}
          {ff.length===0&&fg.length===0&&<Text style={styles.empty}>No matches found.</Text>}
        </>}

        {/* Step 1 */}
        {step === 1 && <>
          <Text style={styles.heading}>What was it?</Text>
          <Text style={styles.label}>Description</Text>
          <View style={{flexDirection:'row',gap:8,marginBottom:8}}>
            <TextInput value={description} onChangeText={handleDesc} placeholder="Dinner, Gas, Rent…" placeholderTextColor={C.mutedLight} style={[styles.input,{flex:1}]} />
            <TouchableOpacity style={styles.scanBtn}><Ionicons name="camera-outline" size={20} color={C.muted}/><Text style={styles.scanText}>Scan</Text></TouchableOpacity>
          </View>
          {description.trim() && <>
            <TouchableOpacity onPress={()=>setCatOpen(v=>!v)} style={styles.catChip}>
              <CategoryIcon category={category} size={20} />
              <Text style={styles.catChipText}>{CAT_LABELS[category]}</Text>
              <Ionicons name={catOpen?'chevron-up':'chevron-down'} size={12} color={C.muted} />
            </TouchableOpacity>
            {catOpen && <View style={styles.catGrid}>
              {ALL_CATS.map(cat=>(
                <TouchableOpacity key={cat} onPress={()=>{setCategory(cat);setCatOpen(false);}} style={[styles.catCell, category===cat&&styles.catCellActive]}>
                  {category===cat ? <Ionicons name="checkmark" size={16} color="#fff"/> : <CategoryIcon category={cat} size={24}/>}
                  <Text style={[styles.catCellText, category===cat&&{color:'#fff'}]}>{CAT_LABELS[cat]}</Text>
                </TouchableOpacity>
              ))}
            </View>}
            {category==='general'&&<TextInput value={customCat} onChangeText={setCustomCat} placeholder="Describe category (optional)…" placeholderTextColor={C.mutedLight} style={[styles.input,{marginTop:8}]}/>}
          </>}
          <Text style={[styles.label,{marginTop:16}]}>Total amount</Text>
          <View style={styles.amtWrap}>
            <Text style={styles.amtSign}>$</Text>
            <TextInput value={amount} onChangeText={v=>{if(/^[0-9]*\.?[0-9]*$/.test(v))setAmount(v);}} placeholder="0.00" placeholderTextColor={C.mutedLight} keyboardType="decimal-pad" style={styles.amtInput}/>
          </View>
          <Text style={[styles.label,{marginTop:16}]}>Paid by</Text>
          {members.length<=2 ? (
            <View style={{flexDirection:'row',gap:8}}>
              {members.map(m=>(
                <TouchableOpacity key={m} onPress={()=>setPaidBy(m)} style={[styles.paidBtn,{flex:1},paidBy===m&&styles.paidBtnActive]}>
                  <Text style={[styles.paidText,paidBy===m&&{color:'#fff'}]}>{m==='You'?'You':m.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.membersWrap}>
              {members.map(m=>(
                <TouchableOpacity key={m} onPress={()=>setPaidBy(m)} style={[styles.memberPill,paidBy===m&&styles.memberPillActive]}>
                  <Text style={[styles.memberPillText,paidBy===m&&{color:'#fff'}]}>{m==='You'?'You':m.split(' ')[0]}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity onPress={()=>setStep(2)} disabled={!step1Valid} style={[styles.nextBtn,!step1Valid&&styles.nextBtnDisabled]}>
            <Text style={[styles.nextBtnText,!step1Valid&&{color:C.muted}]}>Next</Text>
          </TouchableOpacity>
        </>}

        {/* Step 2 */}
        {step === 2 && <>
          <Text style={styles.heading}>How to split?</Text>
          <Text style={styles.subheading}>{fmt(parsed)} with <Text style={{color:C.dark,fontWeight:'700'}}>{withLabel}</Text></Text>
          <View style={styles.splitTabs}>
            {(['equal','amount','percent'] as const).map((t,i)=>(
              <TouchableOpacity key={t} onPress={()=>setSplitType(t)} style={[styles.splitTab,splitType===t&&styles.splitTabActive]}>
                <Text style={[styles.splitTabText,splitType===t&&{color:'#fff'}]}>{['Equally','By $','By %'][i]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {splitType==='equal' && <>
            <Text style={styles.sectionLabel}>Each person pays</Text>
            {members.map((m,i)=>(
              <View key={m} style={[styles.splitRow,i!==0&&styles.rowBorder]}>
                <View style={[styles.memberAvatar,{backgroundColor:m==='You'?C.dark:C.divider}]}><Text style={[styles.memberAvatarText,{color:m==='You'?'#fff':C.muted}]}>{m==='You'?'ME':ini(m)}</Text></View>
                <Text style={[styles.rowName,{flex:1}]}>{m}</Text>
                <Text style={styles.splitAmt}>{fmt(share)}</Text>
              </View>
            ))}
          </>}

          {splitType==='amount' && <>
            <Text style={styles.sectionLabel}>Each person's share ($)</Text>
            {members.map((m,i)=>(
              <View key={m} style={[styles.splitRow,i!==0&&styles.rowBorder]}>
                <View style={[styles.memberAvatar,{backgroundColor:m==='You'?C.dark:C.divider}]}><Text style={[styles.memberAvatarText,{color:m==='You'?'#fff':C.muted}]}>{m==='You'?'ME':ini(m)}</Text></View>
                <Text style={[styles.rowName,{flex:1}]}>{m}</Text>
                <View style={styles.splitInput}>
                  <Text style={styles.splitSign}>$</Text>
                  <TextInput value={customAmounts[m]??''} onChangeText={v=>{if(/^[0-9]*\.?[0-9]*$/.test(v))setCustomAmounts(p=>({...p,[m]:v}));}} placeholder="0.00" placeholderTextColor={C.mutedLight} keyboardType="decimal-pad" style={styles.splitInputText}/>
                </View>
              </View>
            ))}
            <View style={[styles.indicator,{backgroundColor:custValid?C.emeraldBg:C.orangeBg}]}>
              <Text style={{fontSize:12,fontWeight:'600',color:custValid?C.emerald:C.orange}}>{custValid?'Splits add up ✓':`Remaining: $${Math.abs(parsed-custTotal).toFixed(2)}`}</Text>
            </View>
          </>}

          {splitType==='percent' && <>
            <Text style={styles.sectionLabel}>Each person's share (%)</Text>
            {members.map((m,i)=>{
              const pct = parseFloat(percentAmts[m]||'0')||0;
              return (
                <View key={m} style={[styles.splitRow,i!==0&&styles.rowBorder]}>
                  <View style={[styles.memberAvatar,{backgroundColor:m==='You'?C.dark:C.divider}]}><Text style={[styles.memberAvatarText,{color:m==='You'?'#fff':C.muted}]}>{m==='You'?'ME':ini(m)}</Text></View>
                  <View style={{flex:1}}><Text style={styles.rowName}>{m}</Text>{pct>0&&<Text style={styles.rowSub}>${((pct/100)*parsed).toFixed(2)}</Text>}</View>
                  <View style={styles.splitInput}>
                    <TextInput value={percentAmts[m]??''} onChangeText={v=>{if(/^[0-9]*\.?[0-9]*$/.test(v))setPercentAmts(p=>({...p,[m]:v}));}} placeholder="0" placeholderTextColor={C.mutedLight} keyboardType="decimal-pad" style={[styles.splitInputText,{textAlign:'right',width:50}]}/>
                    <Text style={styles.splitSign}>%</Text>
                  </View>
                </View>
              );
            })}
            <View style={[styles.indicator,{backgroundColor:pctValid?C.emeraldBg:C.orangeBg}]}>
              <Text style={{fontSize:12,fontWeight:'600',color:pctValid?C.emerald:C.orange}}>{pctValid?'Percentages add up ✓':`Remaining: ${Math.abs(100-pctTotal).toFixed(0)}%`}</Text>
            </View>
          </>}

          <View style={styles.summaryCard}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
              <Text style={{fontSize:11,fontWeight:'600',color:C.muted,letterSpacing:1,textTransform:'uppercase'}}>{description}</Text>
              <CategoryIcon category={category} size={28} />
            </View>
            <Text style={{fontSize:32,fontWeight:'900',color:'#fff',letterSpacing:-1}}>{fmt(parsed)}</Text>
            <Text style={{fontSize:12,color:C.muted,marginTop:4}}>{paidBy==='You'?'You':paidBy.split(' ')[0]} paid · {withLabel} · {CAT_LABELS[category]}</Text>
          </View>

          <TouchableOpacity onPress={()=>{setDone(true);setTimeout(()=>router.back(),1500);}} disabled={done||!step2Valid}
            style={[styles.addBtn,done?{backgroundColor:C.emerald}:step2Valid?{}:styles.nextBtnDisabled]}>
            <Text style={[styles.addBtnText,(!step2Valid&&!done)&&{color:C.muted}]}>{done?'Expense added ✓':'Add expense'}</Text>
          </TouchableOpacity>
        </>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  header: { flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,paddingBottom:12 },
  backBtn: { width:36,height:36,borderRadius:18,backgroundColor:C.divider,alignItems:'center',justifyContent:'center' },
  title: { fontSize:13,fontWeight:'600',color:C.muted },
  steps: { flexDirection:'row',alignItems:'center',paddingHorizontal:20,paddingBottom:20 },
  stepItem: { flexDirection:'row',alignItems:'center',gap:6 },
  stepDot: { width:20,height:20,borderRadius:10,alignItems:'center',justifyContent:'center' },
  stepDone: { backgroundColor:C.dark },
  stepActive: { backgroundColor:C.orange },
  stepPending: { backgroundColor:C.divider },
  stepNum: { fontSize:10,fontWeight:'700',color:C.muted },
  stepLabel: { fontSize:11,fontWeight:'600' },
  stepLine: { flex:1,height:1,backgroundColor:C.divider,marginHorizontal:6 },
  stepLineDone: { backgroundColor:C.dark },
  body: { paddingHorizontal:20,paddingBottom:80 },
  heading: { fontSize:24,fontWeight:'900',color:C.dark,letterSpacing:-0.5,marginBottom:16 },
  subheading: { fontSize:14,color:C.muted,marginBottom:16 },
  searchBar: { flexDirection:'row',alignItems:'center',gap:10,backgroundColor:C.white,borderRadius:16,paddingHorizontal:14,paddingVertical:12,marginBottom:20 },
  searchInput: { flex:1,fontSize:13,color:C.dark },
  sectionLabel: { fontSize:11,fontWeight:'600',color:C.muted,letterSpacing:1.5,textTransform:'uppercase',marginBottom:10,marginTop:8 },
  row: { flexDirection:'row',alignItems:'center',gap:12,paddingVertical:14 },
  rowBorder: { borderTopWidth:1,borderTopColor:C.divider },
  rowName: { fontSize:15,fontWeight:'600',color:C.dark },
  rowSub: { fontSize:12,color:C.muted,marginTop:1 },
  empty: { textAlign:'center',color:C.muted,fontSize:14,paddingVertical:40 },
  label: { fontSize:11,fontWeight:'600',color:C.muted,letterSpacing:1.5,textTransform:'uppercase',marginBottom:8 },
  input: { backgroundColor:C.white,borderRadius:16,paddingHorizontal:16,paddingVertical:14,fontSize:15,color:C.dark },
  scanBtn: { width:56,backgroundColor:C.white,borderRadius:16,alignItems:'center',justifyContent:'center',gap:3 },
  scanText: { fontSize:8,fontWeight:'700',color:C.muted,textTransform:'uppercase',letterSpacing:0.5 },
  catChip: { flexDirection:'row',alignItems:'center',gap:8,backgroundColor:C.divider,borderRadius:50,paddingHorizontal:12,paddingVertical:8,alignSelf:'flex-start',marginBottom:4 },
  catChipText: { fontSize:12,fontWeight:'600',color:C.dark },
  catGrid: { flexDirection:'row',flexWrap:'wrap',gap:6,marginTop:8 },
  catCell: { width:'23%',alignItems:'center',gap:4,paddingVertical:10,borderRadius:12,backgroundColor:C.white },
  catCellActive: { backgroundColor:C.dark },
  catCellText: { fontSize:9,fontWeight:'600',color:C.muted,textAlign:'center' },
  amtWrap: { flexDirection:'row',alignItems:'center',backgroundColor:C.white,borderRadius:16,paddingHorizontal:16 },
  amtSign: { fontSize:15,fontWeight:'600',color:C.muted,marginRight:4 },
  amtInput: { flex:1,fontSize:22,fontWeight:'700',color:C.dark,paddingVertical:14 },
  paidBtn: { paddingVertical:14,borderRadius:16,backgroundColor:C.white,alignItems:'center' },
  paidBtnActive: { backgroundColor:C.dark },
  paidText: { fontSize:13,fontWeight:'600',color:C.muted },
  membersWrap: { flexDirection:'row',flexWrap:'wrap',gap:8 },
  memberPill: { paddingHorizontal:14,paddingVertical:10,borderRadius:12,backgroundColor:C.white },
  memberPillActive: { backgroundColor:C.dark },
  memberPillText: { fontSize:13,fontWeight:'600',color:C.muted },
  nextBtn: { marginTop:24,paddingVertical:16,borderRadius:24,backgroundColor:C.dark,alignItems:'center' },
  nextBtnDisabled: { backgroundColor:C.divider },
  nextBtnText: { fontSize:14,fontWeight:'700',color:'#fff',letterSpacing:0.3 },
  splitTabs: { flexDirection:'row',backgroundColor:C.divider,borderRadius:12,padding:3,gap:3,marginBottom:16 },
  splitTab: { flex:1,paddingVertical:10,borderRadius:10,alignItems:'center' },
  splitTabActive: { backgroundColor:C.dark },
  splitTabText: { fontSize:12,fontWeight:'600',color:C.muted },
  splitRow: { flexDirection:'row',alignItems:'center',gap:12,paddingVertical:12 },
  memberAvatar: { width:36,height:36,borderRadius:18,alignItems:'center',justifyContent:'center' },
  memberAvatarText: { fontSize:11,fontWeight:'700' },
  splitAmt: { fontSize:15,fontWeight:'700',color:C.dark },
  splitInput: { flexDirection:'row',alignItems:'center',backgroundColor:C.bg,borderRadius:10,paddingHorizontal:8,paddingVertical:6 },
  splitSign: { fontSize:13,color:C.muted },
  splitInputText: { fontSize:13,color:C.dark,width:60,textAlign:'right' },
  indicator: { marginTop:8,padding:12,borderRadius:12,alignItems:'center' },
  summaryCard: { backgroundColor:C.dark,borderRadius:24,padding:20,marginTop:20 },
  addBtn: { marginTop:12,paddingVertical:16,borderRadius:24,backgroundColor:C.orange,alignItems:'center', shadowColor:C.orange,shadowOffset:{width:0,height:6},shadowOpacity:0.35,shadowRadius:12,elevation:6 },
  addBtnText: { fontSize:14,fontWeight:'700',color:'#fff',letterSpacing:0.3 },
});
