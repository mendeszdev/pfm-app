// Tokens de cor usados em style= inline onde className não é suficiente
// (ex: cores dinâmicas baseadas em dados — pos/neg por transação)
// Para layouts estáticos, use className com as classes do tailwind.config.js
export const colors = {
  bg: "#FFFFFF",
  surface: "#FFFFFF",
  surface2: "#F7F7F7",
  ink: "#000000",
  ink2: "#6E6E6E",
  line: "#E0E0E0",
  acc: "#000000",
  accSoft: "#F0F0F0",
  accInk: "#FFFFFF",
  pos: "#1D6F3C",
  neg: "#AE2318",
  warn: "#8A6400",
} as const;

export const darkColors = {
  bg: "#000000",
  surface: "#000000",
  surface2: "#0C0C0C",
  ink: "#FFFFFF",
  ink2: "#8A8A8A",
  line: "#1F1F1F",
  acc: "#FFFFFF",
  accSoft: "#161616",
  accInk: "#000000",
  pos: "#7ED49B",
  neg: "#FF8F80",
  warn: "#E6C566",
} as const;

// Mantido para compatibilidade com imports antigos durante migração
export const theme = { colors };
