export default {
  expo: {
    name: "SerafaceMobile",
    slug: "SerafaceMobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#f5d0f1",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#f5d0f1",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "metro",
    },
    plugins: ["expo-font"],
  },
};
