import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Haptics from 'expo-haptics';
import {
  SafeAreaProvider,
  initialWindowMetrics,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import gameHtml from './game/gameHtml';

// El juego pide vibraciones con postMessage({t:'haptic', k}) y aquí las hace el móvil.
function onGameMessage(event) {
  let msg;
  try {
    msg = JSON.parse(event.nativeEvent.data);
  } catch {
    return;
  }
  if (msg.t !== 'haptic') return;
  switch (msg.k) {
    case 'light':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'heavy':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case 'success':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
  }
}

function Game() {
  // Márgenes reales de la pantalla (notch, isla, esquinas, barra de inicio).
  // Dentro de la WebView el CSS env(safe-area-inset-*) llega a 0, así que se los pasamos al juego.
  const ins = useSafeAreaInsets();
  const safe = {
    top: Math.round(ins.top),
    bottom: Math.round(ins.bottom),
    left: Math.round(ins.left),
    right: Math.round(ins.right),
  };
  const inject = `window.__SAFE=${JSON.stringify(safe)};true;`;

  return (
    <WebView
      key={inject}
      style={styles.web}
      originWhitelist={['*']}
      // un origen fijo para que el récord, el catálogo y los ajustes (localStorage) se guarden
      source={{ html: gameHtml, baseUrl: 'https://invasores.local/' }}
      injectedJavaScriptBeforeContentLoaded={inject}
      onMessage={onGameMessage}
      javaScriptEnabled
      domStorageEnabled
      scrollEnabled={false}
      bounces={false}
      overScrollMode="never"
      contentInsetAdjustmentBehavior="never"
      automaticallyAdjustContentInsets={false}
      setBuiltInZoomControls={false}
      allowsInlineMediaPlayback
      mediaPlaybackRequiresUserAction={false}
    />
  );
}

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Game />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  web: { flex: 1, backgroundColor: '#000' },
});
