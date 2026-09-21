import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native"
import { colors } from "../../theme"

const MOCK_ACTIVE = [
  {
    id: "1",
    name: "Viagem · Chile",
    deadline: "20/12/2026",
    daysLeft: "faltam 92 dias",
    status: "Ativa" as const,
    current: 800,
    target: 2000,
    pct: 40,
    remaining: "R$ 1.200",
    insight: "Guarde R$ 91,30 por semana para fechar no prazo.",
  },
  {
    id: "2",
    name: "Reserva de emergência",
    deadline: null,
    daysLeft: "sem prazo definido",
    status: "Ativa" as const,
    current: 6200,
    target: 10000,
    pct: 62,
    remaining: "R$ 3.800",
    insight: null,
  },
  {
    id: "3",
    name: "Notebook novo",
    deadline: "01/09/2026",
    daysLeft: "19 dias em atraso",
    status: "Atrasada" as const,
    current: 2400,
    target: 5500,
    pct: 44,
    remaining: "R$ 3.100",
    insight: null,
  },
]

const MOCK_COMPLETED = [
  {
    id: "4",
    name: "Curso de inglês",
    current: 1800,
    target: 1800,
    pct: 100,
    note: "não aceita novos aportes",
  },
]

const MOCK_ARCHIVED: never[] = []

export default function GoalsScreen() {
  const [activeTab, setActiveTab] = useState<"Ativas" | "Concluídas" | "Arquivadas">("Ativas")
  const [modalVisible, setModalVisible] = useState(false)
  const [goalName, setGoalName] = useState("")
  const [targetValue, setTargetValue] = useState("")
  const [deadline, setDeadline] = useState("")

  const formatCurrency = (value: number) =>
    "R$ " + value.toLocaleString("pt-BR", { minimumFractionDigits: 0 })

  const renderActiveGoals = () =>
    MOCK_ACTIVE.map((goal) => (
      <View key={goal.id} className="mx-6 mt-4 border border-line p-4">
        {/* Row 1: name + status badge */}
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 mr-2 text-[15px] font-bold text-ink" numberOfLines={1}>
            {goal.name}
          </Text>
          <View
            className="px-2 py-[3px] border"
            style={{ borderColor: goal.status === "Atrasada" ? colors.neg : colors.pos }}
          >
            <Text
              className="text-[10px] tracking-[0.5px]"
              style={{ color: goal.status === "Atrasada" ? colors.neg : colors.pos }}
            >
              {goal.status}
            </Text>
          </View>
        </View>

        {/* Row 2: deadline / days left */}
        <Text className="text-[11px] text-ink2 font-mono mt-1">
          {goal.deadline ? `Prazo ${goal.deadline} · ${goal.daysLeft}` : goal.daysLeft}
        </Text>

        {/* Progress bar */}
        <View className="h-1 bg-acc-soft mt-3">
          <View
            style={{
              width: `${goal.pct}%`,
              height: 4,
              backgroundColor: goal.status === "Atrasada" ? colors.neg : colors.acc,
            }}
          />
        </View>

        {/* Row 3: amounts + pct */}
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-[13px] text-ink">{formatCurrency(goal.current)} / {formatCurrency(goal.target)}</Text>
          <Text className="text-[12px] text-ink2">{goal.pct}% concluído</Text>
        </View>

        {/* Row 4: remaining */}
        <Text className="text-[12px] text-ink2 mt-1">{goal.remaining} restantes</Text>

        {/* Insight */}
        {goal.insight && (
          <View className="mt-3 border-t border-line pt-[10px]">
            <Text className="text-[12px] text-ink2 italic">
              <Text className="text-[12px] text-ink2">IA: </Text>
              {goal.insight}
            </Text>
          </View>
        )}

        {/* Registrar aporte button */}
        <TouchableOpacity className="border border-line py-[10px] items-center mt-3" activeOpacity={0.7}>
          <Text className="text-[12px] text-ink tracking-[0.5px]">Registrar aporte</Text>
        </TouchableOpacity>
      </View>
    ))

  const renderCompletedGoals = () =>
    MOCK_COMPLETED.map((goal) => (
      <View key={goal.id} className="mx-6 mt-4 border border-line p-4">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 mr-2 text-[15px] font-bold text-ink">{goal.name}</Text>
          <View className="px-2 py-[3px] border" style={{ borderColor: colors.pos }}>
            <Text className="text-[10px] tracking-[0.5px]" style={{ color: colors.pos }}>Concluída</Text>
          </View>
        </View>

        <View className="h-1 bg-acc-soft mt-3">
          <View style={{ width: "100%", height: 4, backgroundColor: colors.acc }} />
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-[13px]" style={{ color: colors.pos }}>
            {formatCurrency(goal.target)} / {formatCurrency(goal.target)}
          </Text>
          <Text className="text-[12px] text-ink2">100%</Text>
        </View>

        <Text className="text-[11px] text-ink2 font-mono mt-2">{goal.note}</Text>
      </View>
    ))

  const renderArchivedGoals = () => (
    <View className="flex-1 justify-center items-center pt-16">
      <Text className="text-[14px] text-ink2">Nenhuma meta arquivada</Text>
    </View>
  )

  return (
    <View className="flex-1 bg-bg">
      {/* Header area */}
      <View className="border-b border-line">
        <View className="px-6 pt-4 pb-3">
          <Text className="text-[20px] font-bold text-ink">Metas</Text>
        </View>
        <View className="flex-row border-b border-line">
          {(["Ativas", "Concluídas", "Arquivadas"] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              className={
                activeTab === tab
                  ? "flex-1 items-center py-3 border-b-2 border-acc"
                  : "flex-1 items-center py-3 border-b border-line"
              }
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                className={
                  activeTab === tab
                    ? "text-[13px] text-ink font-semibold"
                    : "text-[13px] text-ink2"
                }
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "Ativas" && renderActiveGoals()}
        {activeTab === "Concluídas" && renderCompletedGoals()}
        {activeTab === "Arquivadas" && renderArchivedGoals()}
        <View style={{ height: 88 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          backgroundColor: colors.acc,
          borderRadius: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text className="text-[24px]" style={{ color: colors.accInk }}>+</Text>
      </TouchableOpacity>

      {/* Modal */}
      {modalVisible && (
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" }}>
            <View className="bg-bg border-t border-line p-6">
              {/* Modal header */}
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-[16px] font-bold text-ink">Nova meta</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text className="text-[22px] text-ink2">×</Text>
                </TouchableOpacity>
              </View>

              {/* Nome da meta */}
              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mb-[6px]">NOME DA META</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={goalName}
                onChangeText={setGoalName}
                placeholder="Nome da meta"
                placeholderTextColor={colors.ink2}
              />

              {/* Valor alvo */}
              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mb-[6px] mt-4">VALOR ALVO</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={targetValue}
                onChangeText={setTargetValue}
                keyboardType="decimal-pad"
                placeholder="R$ 0,00"
                placeholderTextColor={colors.ink2}
              />

              {/* Data de conclusão */}
              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mb-[6px] mt-4">DATA DE CONCLUSÃO</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={deadline}
                onChangeText={setDeadline}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={colors.ink2}
              />
              <Text className="text-[11px] text-ink2 mt-1">Deixe em branco para meta sem prazo.</Text>

              {/* Criar meta button */}
              <TouchableOpacity
                className="h-12 justify-center items-center mt-6"
                style={{ backgroundColor: colors.acc, borderRadius: 0 }}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text className="text-[15px] font-semibold" style={{ color: colors.accInk }}>Criar meta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}
