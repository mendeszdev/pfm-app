import React, { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native"
import { colors } from "../../theme"

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_TOTALS = { income: "6.200,00", expense: "3.914,80", month: "Set/2026" }

const MOCK_GROUPS = [
  {
    date: "Hoje",
    items: [
      { id: "1", desc: "Mercado São Jorge", category: "Alimentação", badge: "importada", amount: "−184,20", isExpense: true },
      { id: "2", desc: "Uber", category: "Transporte", badge: "importada", amount: "−28,90", isExpense: true },
    ],
  },
  {
    date: "Ontem",
    items: [
      { id: "3", desc: "Padaria Real", category: "Alimentação", badge: "manual", amount: "−42,10", isExpense: true },
      { id: "4", desc: "Farmácia", category: "Saúde", badge: "manual", amount: "−96,40", isExpense: true },
    ],
  },
  {
    date: "05/09/2026",
    items: [
      { id: "5", desc: "Salário", category: "Receita", badge: "importada", amount: "+6.200,00", isExpense: false },
      { id: "6", desc: "Aluguel", category: "Moradia", badge: "importada", amount: "−1.860,00", isExpense: true },
    ],
  },
]

const CATEGORIES = ["Todas", "Alimentação", "Transporte", "Moradia", "Lazer", "Saúde", "Receita"]
const FILTER_TYPES = ["Todos", "Despesa", "Receita"]

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function TransactionsScreen() {
  const [activeCategory, setActiveCategory] = useState("Todas")
  const [activeType, setActiveType] = useState("Todos")
  const [modalVisible, setModalVisible] = useState(false)
  const [txType, setTxType] = useState<"Despesa" | "Receita">("Despesa")

  // modal fields
  const [value, setValue] = useState("")
  const [category, setCategory] = useState("")
  const [account, setAccount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  return (
    <View className="flex-1 bg-bg">
      {/* Header area */}
      <View className="border-b border-line">
        {/* Totals row */}
        <View className="px-6 pt-4 pb-3">
          <Text className="text-[11px] text-ink2 font-mono tracking-[1px]">{MOCK_TOTALS.month}</Text>
          <View className="flex-row mt-1.5 gap-4">
            <View className="flex-row items-baseline">
              <Text className="text-[13px] text-pos">{`↑ ${MOCK_TOTALS.income}`}</Text>
              <Text className="text-[11px] text-ink2"> entradas</Text>
            </View>
            <View className="flex-row items-baseline">
              <Text className="text-[13px] text-neg">{`↓ ${MOCK_TOTALS.expense}`}</Text>
              <Text className="text-[11px] text-ink2"> saídas</Text>
            </View>
          </View>
        </View>

        {/* Category filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: 12 }}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 8, flexDirection: "row" }}
        >
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory
            return (
              <TouchableOpacity
                key={cat}
                className={active ? "bg-acc px-3.5 py-2.5 mr-2" : "border border-line px-3.5 py-2.5 mr-2"}
                onPress={() => setActiveCategory(cat)}
              >
                <Text className={active ? "text-[12px] text-acc-ink" : "text-[12px] text-ink2"}>
                  {cat}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        {/* Type filter */}
        <View className="flex-row px-6 pb-3 gap-2">
          {FILTER_TYPES.map((ft) => {
            const active = ft === activeType
            return (
              <TouchableOpacity
                key={ft}
                className={active ? "bg-acc px-3.5 py-2.5 mr-2" : "border border-line px-3.5 py-2.5 mr-2"}
                onPress={() => setActiveType(ft)}
              >
                <Text className={active ? "text-[12px] text-acc-ink" : "text-[12px] text-ink2"}>
                  {ft}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {/* Transaction groups */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {MOCK_GROUPS.map((group) => (
          <View key={group.date}>
            <View className="px-6 pt-4 pb-2">
              <Text className="text-[10px] tracking-[1px] text-ink2 font-mono uppercase">{group.date}</Text>
            </View>
            {group.items.map((item) => (
              <View key={item.id} className="flex-row px-6 py-3.5 border-b border-line items-center">
                <View className="flex-1 mr-3">
                  <Text className="text-[14px] font-medium text-ink">{item.desc}</Text>
                  <View className="flex-row items-center mt-0.5">
                    <Text className="text-[11px] text-ink2 font-mono">{item.category}</Text>
                    <Text className="text-[11px] text-ink2"> · </Text>
                    <View
                      className={
                        item.badge === "manual"
                          ? "border border-acc px-1.5 py-0.5"
                          : "border border-line px-1.5 py-0.5"
                      }
                    >
                      <Text
                        className={
                          item.badge === "manual"
                            ? "text-[9px] text-acc uppercase"
                            : "text-[9px] text-ink2 uppercase"
                        }
                      >
                        {item.badge}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  className="text-[14px] font-semibold"
                  style={{ color: item.isExpense ? colors.neg : colors.pos }}
                >
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>
        ))}
        <View style={{ height: 96 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={{ position: "absolute", bottom: 24, right: 24, width: 48, height: 48, backgroundColor: colors.acc, borderRadius: 0, justifyContent: "center", alignItems: "center" }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: colors.accInk, fontSize: 24, lineHeight: 24 }}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      {modalVisible && (
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
            <View className="absolute bottom-0 left-0 right-0 bg-bg border-t border-line p-6">
              {/* Modal header */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-[16px] font-bold text-ink">Nova transação</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text className="text-[20px] text-ink2">×</Text>
                </TouchableOpacity>
              </View>

              {/* Type toggle */}
              <View className="flex-row gap-2 mb-4">
                {(["Despesa", "Receita"] as const).map((t) => {
                  const active = t === txType
                  return (
                    <TouchableOpacity
                      key={t}
                      className={active ? "flex-1 py-2.5 items-center bg-acc" : "flex-1 py-2.5 items-center border border-line"}
                      onPress={() => setTxType(t)}
                    >
                      <Text className={active ? "text-[14px] font-medium text-acc-ink" : "text-[14px] font-medium text-ink"}>
                        {t}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>

              {/* Fields */}
              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mt-3 mb-1">VALOR</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                keyboardType="decimal-pad"
                value={value}
                onChangeText={setValue}
                placeholder="0,00"
                placeholderTextColor={colors.ink2}
              />

              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mt-3 mb-1">CATEGORIA</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={category}
                onChangeText={setCategory}
                placeholder={CATEGORIES[1]}
                placeholderTextColor={colors.ink2}
              />

              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mt-3 mb-1">CONTA</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={account}
                onChangeText={setAccount}
                placeholder="Corrente"
                placeholderTextColor={colors.ink2}
              />

              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mt-3 mb-1">DESCRIÇÃO</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={colors.ink2}
              />

              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mt-3 mb-1">DATA</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={date}
                onChangeText={setDate}
                placeholder="20/09/2026"
                placeholderTextColor={colors.ink2}
              />

              <Text className="text-[12px] text-ink2 mt-2 mb-4">
                {txType === "Despesa"
                  ? "Uma despesa decrementa o saldo da conta automaticamente."
                  : "Uma receita incrementa o saldo da conta automaticamente."}
              </Text>

              {/* Save button */}
              <TouchableOpacity
                className="h-12 bg-acc justify-center items-center"
                style={{ borderRadius: 0 }}
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-[14px] font-semibold text-acc-ink">Salvar transação</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}
