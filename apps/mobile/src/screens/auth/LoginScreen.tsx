import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParamList } from "../../navigation/AuthNavigator"
import { useAuthStore } from "../../store/auth.store"
import { theme } from "../../theme"
import api from "../../services/api"

type Props = NativeStackScreenProps<AuthStackParamList, "Login">

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const { setAuth } = useAuthStore()

  async function handleLogin() {
    if (!email || !password) {
      setErrorMsg("Credenciais inválidas. Verifique e-mail e senha.")
      return
    }

    try {
      setLoading(true)
      const { data } = await api.post("/auth/login", { email, password })
      await setAuth(data.token, data.user)
    } catch (error: any) {
      setErrorMsg("Credenciais inválidas. Verifique e-mail e senha.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 px-6 justify-center">
        {/* Logo */}
        <View>
          <Text className="text-[40px] font-bold text-ink" style={{ letterSpacing: -2 }}>PFM</Text>
          <Text className="text-[11px] font-mono text-ink2 uppercase mt-1" style={{ letterSpacing: 2 }}>
            Finanças pessoais
          </Text>
        </View>

        {/* Tagline */}
        <Text className="text-[14px] text-ink2 mt-8 mb-10">
          Suas contas, metas e alertas em um lugar só.
        </Text>

        {/* Error inline */}
        {errorMsg !== "" && (
          <View className="border-l-[3px] border-l-neg pl-3 py-2 mb-4">
            <Text className="text-[13px] text-neg">{errorMsg}</Text>
          </View>
        )}

        {/* E-MAIL */}
        <Text className="text-[11px] font-medium text-ink uppercase mb-1.5" style={{ letterSpacing: 1 }}>
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
          onChangeText={(v) => { setErrorMsg(""); setEmail(v) }}
        />

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
            onChangeText={(v) => { setErrorMsg(""); setPassword(v) }}
          />
          <TouchableOpacity
            className="border border-l-0 border-line bg-surface2 h-12 px-3 justify-center"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Text className="text-[12px] text-ink2">{showPassword ? "OCULTAR" : "VER"}</Text>
          </TouchableOpacity>
        </View>

        {/* Button */}
        <TouchableOpacity
          className="bg-acc h-12 items-center justify-center mt-6"
          style={{ borderRadius: 0, opacity: loading ? 0.6 : 1 }}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.accInk} />
          ) : (
            <Text className="text-acc-ink text-[14px] font-semibold" style={{ letterSpacing: 1 }}>
              Entrar
            </Text>
          )}
        </TouchableOpacity>

        {/* Links */}
        <View className="flex-row justify-center items-center mt-6">
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="text-ink font-semibold text-[14px]">Criar conta</Text>
          </TouchableOpacity>
          <Text className="text-ink2"> · </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-ink2 text-[14px]">Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
