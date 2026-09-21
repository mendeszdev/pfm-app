import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../navigation/AuthNavigator"
import { useAuthStore } from "../../store/auth.store"
import { theme } from "../../theme"
import api from "../../services/api"

type Props = NativeStackScreenProps<AuthStackParamList, "Register">

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const { setAuth } = useAuthStore()

  async function handleRegister() {
    const newErrors: typeof errors = {}

    if (!name) newErrors.name = "Campo obrigatório."
    if (!email) newErrors.email = "Campo obrigatório."
    if (password.length < 6) newErrors.password = "Mínimo de 6 caracteres."
    if (password !== confirmPassword) newErrors.confirmPassword = "As senhas não coincidem."

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      setLoading(true)
      const { data } = await api.post("/auth/register", { name, email, password })
      await setAuth(data.token, data.user)
    } catch (error: any) {
      if (error.response?.status === 409) {
        setErrors({ email: "Este e-mail já está cadastrado." })
      } else {
        setErrors({ email: error.response?.data?.message ?? "Erro ao criar conta" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 48, justifyContent: "center" }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View>
          <Text className="text-[40px] font-bold text-ink" style={{ letterSpacing: -2 }}>PFM</Text>
          <Text className="text-[11px] font-mono text-ink2 uppercase mt-1" style={{ letterSpacing: 2 }}>
            Finanças pessoais
          </Text>
        </View>

        {/* Headline */}
        <Text className="text-[24px] font-bold text-ink mt-8">Criar conta</Text>
        <Text className="text-[14px] text-ink2 mt-1 mb-8">Leva menos de um minuto.</Text>

        {/* NOME */}
        <Text className="text-[11px] font-medium text-ink uppercase mb-1.5" style={{ letterSpacing: 1 }}>
          NOME
        </Text>
        <TextInput
          className="border border-line bg-surface2 h-12 px-3 text-[16px] text-ink"
          style={{ borderRadius: 0 }}
          placeholder=""
          placeholderTextColor={theme.colors.ink2}
          autoCapitalize="words"
          value={name}
          onChangeText={(v) => {
            setErrors((prev) => ({ ...prev, name: undefined }))
            setName(v)
          }}
        />
        {errors.name && <Text className="text-[12px] text-neg mt-1">{errors.name}</Text>}

        {/* E-MAIL */}
        <Text className="text-[11px] font-medium text-ink uppercase mt-4 mb-1.5" style={{ letterSpacing: 1 }}>
          E-MAIL
        </Text>
        <TextInput
          className="border border-line bg-surface2 h-12 px-3 text-[16px] text-ink"
          style={{ borderRadius: 0 }}
          placeholder=""
          placeholderTextColor={theme.colors.ink2}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(v) => {
            setErrors((prev) => ({ ...prev, email: undefined }))
            setEmail(v)
          }}
        />
        {errors.email && <Text className="text-[12px] text-neg mt-1">{errors.email}</Text>}

        {/* SENHA */}
        <Text className="text-[11px] font-medium text-ink uppercase mt-4 mb-1.5" style={{ letterSpacing: 1 }}>
          SENHA
        </Text>
        <View className="flex-row">
          <TextInput
            className="flex-1 border border-line bg-surface2 h-12 px-3 text-[16px] text-ink"
            style={{ borderRadius: 0 }}
            placeholder=""
            placeholderTextColor={theme.colors.ink2}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(v) => {
              setErrors((prev) => ({ ...prev, password: undefined }))
              setPassword(v)
            }}
          />
          <TouchableOpacity
            className="border border-l-0 border-line bg-surface2 h-12 px-3 justify-center"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Text className="text-[12px] text-ink2">{showPassword ? "OCULTAR" : "VER"}</Text>
          </TouchableOpacity>
        </View>
        {errors.password && <Text className="text-[12px] text-neg mt-1">{errors.password}</Text>}

        {/* CONFIRMAR SENHA */}
        <Text className="text-[11px] font-medium text-ink uppercase mt-4 mb-1.5" style={{ letterSpacing: 1 }}>
          CONFIRMAR SENHA
        </Text>
        <View className="flex-row">
          <TextInput
            className="flex-1 border border-line bg-surface2 h-12 px-3 text-[16px] text-ink"
            style={{ borderRadius: 0 }}
            placeholder=""
            placeholderTextColor={theme.colors.ink2}
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={(v) => {
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
              setConfirmPassword(v)
            }}
          />
          <TouchableOpacity
            className="border border-l-0 border-line bg-surface2 h-12 px-3 justify-center"
            onPress={() => setShowConfirm((prev) => !prev)}
          >
            <Text className="text-[12px] text-ink2">{showConfirm ? "OCULTAR" : "VER"}</Text>
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text className="text-[12px] text-neg mt-1">{errors.confirmPassword}</Text>
        )}

        {/* Button */}
        <TouchableOpacity
          className="bg-acc h-12 items-center justify-center mt-6"
          style={{ borderRadius: 0, opacity: loading ? 0.6 : 1 }}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.accInk} />
          ) : (
            <Text className="text-acc-ink text-[14px] font-semibold" style={{ letterSpacing: 1 }}>
              Cadastrar e entrar
            </Text>
          )}
        </TouchableOpacity>

        {/* Link voltar */}
        <TouchableOpacity className="items-center mt-5" onPress={() => navigation.goBack()}>
          <Text className="text-ink2 text-[14px]">Já tenho conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
