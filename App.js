// import { Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Hello World - App is Working!</Text>
//     </View>
//   );
// }

import "./global.css";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GradientIcon } from "./components/UI_Common/Gradients/GradientIcon";
import { GradientHeaderTitle } from "./components/UI_Common/Gradients/GradientHeaderTitle";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Redux setup
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

import HomeScreen from "./screens/Major_Screens/HomeScreen";
import ProductsScreen from "./screens/Major_Screens/ProductsScreen";
import RoutinesScreen from "./screens/Major_Screens/RoutinesScreen";
import BudgetScreen from "./screens/Major_Screens/BudgetScreen";

import SkinProfileScreen from "./screens/Minor_Screens/Home/SkinProfileScreen";
import ScanFaceScreen from "./screens/Minor_Screens/Home/ScanFaceScreen";
import ResultScreen from "./screens/Minor_Screens/Home/ResultScreen";
import ProductScreen from "./screens/Minor_Screens/Products/ProductScreen";
import Colors from "./constants/colors";
import TabBarLabel from "./components/UI_Common/Commons/TabBarLabel";
import CommunityScreen from "./screens/Major_Screens/CommunityScreen";
import ChatFAB from "./components/UI_Common/Commons/ChatFAB";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong. Please restart the app.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.mainBackground,
  },
};

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        animation: "slide_from_right",
        headerLeft: () => null,
        headerRight: () => {
          if (route.name === "Result" || route.name === "MainHome") return null;
          return navigation.canGoBack() ? (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginRight: 15 }}
              android_ripple={{
                color: Colors.primary200,
                borderless: true,
              }}
            >
              <GradientIcon
                name="exit"
                size={28}
                focused={true}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </Pressable>
          ) : null;
        },
      })}
    >
      <Stack.Screen
        name="MainHome"
        component={HomeScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"SerafaceAI"} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="SkinProfile"
        component={SkinProfileScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"Skin Profile"} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="ScanFace"
        component={ScanFaceScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"Scan Face"} />,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"Analysis Report"} />,
          headerRight: () => null,
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function ProductsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: true,
        animation: "slide_from_right",
        headerLeft: () => null,
        headerRight: () => {
          if (route.name === "Result" || route.name === "MainHome") return null;
          return navigation.canGoBack() ? (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginRight: 15 }}
              android_ripple={{
                color: Colors.primary200,
                borderless: true,
              }}
            >
              <GradientIcon
                name="exit"
                size={28}
                focused={true}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </Pressable>
          ) : null;
        },
      })}
    >
      <Stack.Screen
        name="MainProducts"
        component={ProductsScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"Recommendations"} />,
          headerBackVisible: false,
        }}
        initialParams={{ recommendations: null, sessionId: null }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          headerTitle: () => <GradientHeaderTitle title={"Product Details"} />,
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.background,
            height: 67,
            paddingTop: 6,
          },
          headerStyle: {
            backgroundColor: Colors.background,
            height: 85,
          },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={{
                color: Colors.primary200,
                borderless: true,
              }}
            />
          ),
          headerTitleContainerStyle: {
            flex: 1,
            margin: 0,
            padding: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <GradientIcon name={"home"} size={28} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel text={"Home"} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductsStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <GradientIcon name={"cube"} size={28} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel text={"Products"} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Budget"
          component={BudgetScreen}
          options={{
            headerTitle: () => <GradientHeaderTitle title={"Budget Planner"} />,
            tabBarIcon: ({ focused }) => (
              <GradientIcon name={"wallet"} size={28} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel text={"Budget"} focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Routine"
          component={RoutinesScreen}
          options={{
            headerTitle: () => <GradientHeaderTitle title={"Your Routine"} />,
            tabBarIcon: ({ focused }) => (
              <GradientIcon name={"time"} size={28} focused={focused} />
            ),
            tabBarLabel: ({ focused }) => (
              <TabBarLabel text={"Routine"} focused={focused} />
            ),
          }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
              <StatusBar style="dark" />
              <AppNavigator />
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
