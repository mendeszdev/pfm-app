import React from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { colors } from "../../theme"


const MOCK_USER = { name: "David", initials: "DM" }

const MOCK_BALANCE = {
  total: "R$ 12.480,35",
  accounts: "4 CONTAS · 2 BANCOS",
  income: "R$ 6.200,00",
  expense: "R$ 3.914,80",
  monthResult: "+R$ 2.285,20",
  monthLabel: "Mês positivo",
}

const MOCK_ALERT_BANNER = {
  label: "Alimentação perto do limite",
  pct: 87,
  current: "R$ 522,40",
  limit: "R$ 600,00",
  trigger: "gatilho 90%",
}

const MOCK_CATEGORIES = [
  { name: "Alimentação", value: "522,40" },
  { name: "Transporte", value: "288,00" },
  { name: "Moradia", value: "1.860,00" },
  { name: "Lazer", value: "154,20" },
]

const MOCK_GOALS = [
  { name: "Viagem · Chile", current: 800, target: 2000, pct: 40, label: "faltam 92 dias" },
  { name: "Reserva de emergência", current: 6200, target: 10000, pct: 62, label: "sem prazo" },
]

const MOCK_TRANSACTIONS = [
  { desc: "Mercado São Jorge", category: "Alimentação", sub: "Corrente · hoje", amount: "−184,20", isExpense: true },
  { desc: "Uber", category: "Transporte", sub: "Cartão · hoje", amount: "−28,90", isExpense: true },
  { desc: "Salário", category: "Receita", sub: "Corrente · 05/09", amount: "+6.200,00", isExpense: false },
  { desc: "Aluguel", category: "Moradia", sub: "Corrente · 05/09", amount: "−1.860,00", isExpense: true },
  { desc: "Cinema Belas Artes", category: "Lazer", sub: "Cartão · 03/09", amount: "−72,00", isExpense: true },
]

const MOCK_INSIGHT =
  "No ritmo atual você excede o orçamento de Alimentação em 5 dias. Reduzir R$ 38 por semana fecha o mês dentro do limite."

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-bg">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        {/* 1. Header */}
        <View className="px-6 pt-4 pb-3 flex-row justify-between items-center">
          <View>
            <Text className="text-[11px] text-ink2 font-mono tracking-[1px] uppercase">Setembro</Text>
            <Text className="text-[20px] font-bold text-ink mt-0.5">Olá, {MOCK_USER.name}</Text>
          </View>
          <View
            className="w-9 h-9 bg-acc justify-center items-center"
            style={{ borderRadius: 18 }}
          >
            <Text className="text-acc-ink text-[12px] font-bold">{MOCK_USER.initials}</Text>
          </View>
        </View>

        {/* 2. Balance card */}
        <View className="mx-6 mt-2 border border-line p-5">
          <Text className="text-[10px] tracking-[2px] text-ink2 uppercase font-mono">SALDO CONSOLIDADO</Text>
          <Text className="text-[10px] text-ink2 mt-0.5 font-mono">{MOCK_BALANCE.accounts}</Text>
          <Text className="text-[34px] font-bold text-ink mt-3">{MOCK_BALANCE.total}</Text>

          <View className="flex-row mt-2 gap-4">
            <Text className="text-[12px] text-pos">↑ {MOCK_BALANCE.income} entradas</Text>
            <Text className="text-[12px] text-neg">↓ {MOCK_BALANCE.expense} saídas</Text>
          </View>

          <View className="border-t border-line mt-4 mb-3" />

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text className="text-[12px] text-pos font-semibold">{MOCK_BALANCE.monthLabel}</Text>
              <Text className="text-[12px] text-pos"> · </Text>
              <Text className="text-[12px] text-pos">{MOCK_BALANCE.monthResult}</Text>
            </View>
            <TouchableOpacity>
              <Text className="text-[12px] text-ink2">Ver relatório →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Quick actions */}
        <View className="px-6 py-4 border-b border-line">
          <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase">AÇÕES RÁPIDAS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 12 }}
          >
            {["Transação", "Aportar meta", "Novo alerta", "Conectar banco"].map((label) => (
              <TouchableOpacity key={label} className="border border-line px-3.5 py-2.5 mr-2">
                <Text className="text-[12px] text-ink font-medium">{label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 4. Alert banner */}
        <View className="mx-6 mt-4 border border-warn p-3.5 flex-row items-center">
          <Text className="text-[22px] font-bold text-warn mr-3">{MOCK_ALERT_BANNER.pct}%</Text>
          <View className="flex-1">
            <Text className="text-[13px] font-semibold text-warn">{MOCK_ALERT_BANNER.label}</Text>
            <Text className="text-[11px] text-ink2 mt-0.5 font-mono">
              {MOCK_ALERT_BANNER.current} de {MOCK_ALERT_BANNER.limit} · {MOCK_ALERT_BANNER.trigger}
            </Text>
          </View>
        </View>

        {/* 5. Category spend */}
        <View className="px-6 pt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase">GASTOS POR CATEGORIA · SETEMBRO</Text>
            <Text className="text-[12px] text-ink font-semibold">R$ 3.914,80</Text>
          </View>
          {MOCK_CATEGORIES.map((cat) => (
            <View key={cat.name} className="flex-row justify-between py-2.5 border-b border-line">
              <Text className="text-[14px] text-ink">{cat.name}</Text>
              <Text className="text-[14px] text-neg">R$ {cat.value}</Text>
            </View>
          ))}
        </View>

        {/* 6. Active goals */}
        <View className="px-6 pt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase">METAS ATIVAS</Text>
            <TouchableOpacity>
              <Text className="text-[12px] text-ink2">Ver todas →</Text>
            </TouchableOpacity>
          </View>
          {MOCK_GOALS.map((goal) => (
            <View key={goal.name} className="mt-3 border border-line p-3.5">
              <View className="flex-row justify-between items-center">
                <Text className="text-[14px] font-semibold text-ink">{goal.name}</Text>
                <Text className="text-[14px] text-ink">{goal.pct}%</Text>
              </View>
              <View className="h-1 bg-acc-soft mt-2.5">
                <View style={{ width: `${goal.pct}%`, height: 4, backgroundColor: colors.acc }} />
              </View>
              <View className="flex-row justify-between items-center mt-1.5">
                <Text className="text-[12px] text-ink2">
                  R$ {goal.current.toLocaleString("pt-BR")} / R$ {goal.target.toLocaleString("pt-BR")}
                </Text>
                <Text className="text-[11px] text-ink2 font-mono">{goal.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 7. Last transactions */}
        <View className="px-6 pt-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-[10px] tracking-[2px] text-ink2 font-mono uppercase">ÚLTIMAS TRANSAÇÕES</Text>
            <TouchableOpacity>
              <Text className="text-[12px] text-ink2">Ver todas →</Text>
            </TouchableOpacity>
          </View>
          {MOCK_TRANSACTIONS.map((tx, i) => (
            <View key={i} className="flex-row justify-between items-center py-3 border-b border-line">
              <View className="flex-1 mr-3">
                <Text className="text-[14px] font-medium text-ink">{tx.desc}</Text>
                <Text className="text-[11px] text-ink2 mt-0.5 font-mono">{tx.category} · {tx.sub}</Text>
              </View>
              <Text
                className="text-[14px] font-semibold"
                style={{ color: tx.isExpense ? colors.neg : colors.pos }}
              >
                {tx.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* 8. AI Insight banner */}
        <View className="mx-6 mt-4 mb-6 border-l-[3px] border-line pl-3.5 py-3">
          <Text className="text-[10px] tracking-[2px] text-ink2 font-mono">INSIGHT · IA</Text>
          <Text className="text-[13px] text-ink mt-1.5 leading-5">{MOCK_INSIGHT}</Text>
          <Text className="text-[10px] text-ink2 font-mono mt-2">Gerado há 3h · cache de 24h</Text>
        </View>

      </ScrollView>

      {/* 9. Bottom tab bar */}
      <View className="border-t border-line flex-row bg-bg pb-5 pt-3 items-end">
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-[10px] tracking-[1px] font-mono text-ink">INÍCIO</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-[10px] tracking-[1px] font-mono text-ink2">TRANS.</Text>
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <TouchableOpacity
            className="w-12 h-12 items-center justify-center"
            style={{ marginTop: -16, backgroundColor: colors.acc, borderRadius: 0 }}
          >
            <Text style={{ color: colors.accInk, fontSize: 24 }}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-[10px] tracking-[1px] font-mono text-ink2">METAS</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 items-center">
          <Text className="text-[10px] tracking-[1px] font-mono text-ink2">ALERTAS</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
