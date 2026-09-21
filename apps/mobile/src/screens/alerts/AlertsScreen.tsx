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

type AlertStatus = "Disparado" | "Ativo" | "Inativo"

const MOCK_ALERTS = [
  {
    id: "1",
    category: "Alimentação",
    trigger: "Gatilho em 90%",
    triggeredAt: "disparado em 18/09",
    status: "Disparado" as AlertStatus,
    spent: 522.40,
    limit: 600.00,
    pct: 87,
    active: true,
  },
  {
    id: "2",
    category: "Transporte",
    trigger: "Gatilho em 70%",
    triggeredAt: null,
    status: "Ativo" as AlertStatus,
    spent: 288.00,
    limit: 700.00,
    pct: 41,
    active: true,
  },
  {
    id: "3",
    category: "Geral · despesas do mês",
    trigger: "Gatilho em 100%",
    triggeredAt: null,
    status: "Ativo" as AlertStatus,
    spent: 3914.80,
    limit: 4500.00,
    pct: 87,
    active: true,
  },
  {
    id: "4",
    category: "Lazer",
    trigger: "Limite R$ 400",
    triggeredAt: null,
    status: "Inativo" as AlertStatus,
    spent: 0,
    limit: 400.00,
    pct: 0,
    active: false,
  },
]

const formatBRL = (v: number) =>
  "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function getStatusColor(status: AlertStatus): string {
  if (status === "Disparado") return colors.neg
  if (status === "Ativo") return colors.pos
  return colors.ink2
}

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalCategory, setModalCategory] = useState("")
  const [modalLimit, setModalLimit] = useState("")
  const [modalTrigger, setModalTrigger] = useState<"70%" | "90%" | "100%">("90%")

  function toggleAlert(id: string) {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, active: !a.active, status: (!a.active ? "Ativo" : "Inativo") as AlertStatus }
          : a
      )
    )
  }

  return (
    <View className="flex-1 bg-bg">
      {/* Fixed top info banner */}
      <View className="px-6 py-3 border-b border-line bg-surface2">
        <Text className="text-[11px] text-ink2 font-mono leading-4">
          Os alertas disparam uma vez por mês e são resetados no dia 1. Alertas inativos não são
          avaliados.
        </Text>
      </View>

      {/* Screen title */}
      <View className="px-6 pt-4 pb-3 border-b border-line">
        <Text className="text-[20px] font-bold text-ink">Alertas</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {alerts.map((alert) => {
          const sc = getStatusColor(alert.status)
          return (
            <View
              key={alert.id}
              className="mx-6 mt-4 p-4"
              style={{ borderWidth: 1, borderColor: alert.status === "Disparado" ? colors.neg : colors.line }}
            >
              {/* Row 1: category + badge */}
              <View className="flex-row items-center justify-between">
                <Text className="flex-1 mr-2 text-[15px] font-bold text-ink" numberOfLines={1}>
                  {alert.category}
                </Text>
                <View className="px-2 py-[3px] border" style={{ borderColor: sc }}>
                  <Text className="text-[10px] tracking-[0.5px]" style={{ color: sc }}>{alert.status}</Text>
                </View>
              </View>

              {/* Row 2: trigger text */}
              <Text className="text-[11px] text-ink2 font-mono mt-1">
                {alert.trigger}
                {alert.status === "Disparado" && alert.triggeredAt ? (
                  <Text style={{ color: colors.neg }}>{" · " + alert.triggeredAt}</Text>
                ) : null}
              </Text>

              {/* Progress track */}
              <View className="h-1 bg-acc-soft mt-3">
                <View
                  style={{ width: `${alert.pct}%` as any, height: 4, backgroundColor: sc }}
                />
              </View>

              {/* Row 3: amounts + pct */}
              <View className="flex-row items-center justify-between mt-2">
                <Text className="text-[13px] text-ink">
                  {formatBRL(alert.spent)} / {formatBRL(alert.limit)}
                </Text>
                <Text className="text-[12px]" style={{ color: sc }}>{alert.pct}% do limite</Text>
              </View>

              {/* Toggle row */}
              <View className="mt-3 border-t border-line pt-3 flex-row justify-between items-center">
                <Text className="text-[12px] text-ink2">{alert.active ? "Ativo" : "Inativo"}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleAlert(alert.id)}
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    justifyContent: "center",
                    backgroundColor: alert.active ? colors.acc : colors.line,
                  }}
                >
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: colors.bg,
                      position: "absolute",
                      left: alert.active ? 22 : 4,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
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
              {/* Header */}
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-[16px] font-bold text-ink">Novo alerta</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text className="text-[22px] text-ink2">×</Text>
                </TouchableOpacity>
              </View>

              {/* Categoria */}
              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mb-[6px]">CATEGORIA</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={modalCategory}
                onChangeText={setModalCategory}
                placeholder="ex: Alimentação"
                placeholderTextColor={colors.ink2}
              />

              {/* Limite */}
              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mb-[6px] mt-4">LIMITE (R$)</Text>
              <TextInput
                className="border border-line h-11 px-3 text-[14px] text-ink"
                style={{ borderRadius: 0 }}
                value={modalLimit}
                onChangeText={setModalLimit}
                keyboardType="decimal-pad"
                placeholder="0,00"
                placeholderTextColor={colors.ink2}
              />

              {/* Trigger selector */}
              <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase mb-[6px] mt-4">DISPARAR AO ATINGIR</Text>
              <View className="flex-row gap-2 mt-1">
                {(["70%", "90%", "100%"] as const).map((opt) => (
                  <TouchableOpacity
                    key={opt}
                    className="flex-1 h-10 justify-center items-center"
                    style={
                      modalTrigger === opt
                        ? { backgroundColor: colors.acc }
                        : { borderWidth: 1, borderColor: colors.line }
                    }
                    onPress={() => setModalTrigger(opt)}
                    activeOpacity={0.8}
                  >
                    <Text
                      className="text-[13px] font-semibold"
                      style={{ color: modalTrigger === opt ? colors.accInk : colors.ink }}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-[11px] text-ink2 mt-2">
                O alerta dispara uma vez por mês e é resetado no dia 1.
              </Text>

              {/* Criar alerta */}
              <TouchableOpacity
                className="h-12 justify-center items-center mt-6"
                style={{ backgroundColor: colors.acc, borderRadius: 0 }}
                onPress={() => setModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text className="text-[15px] font-semibold" style={{ color: colors.accInk }}>Criar alerta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}
