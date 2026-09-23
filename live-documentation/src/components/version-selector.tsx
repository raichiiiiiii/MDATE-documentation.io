import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from './themed-text';

interface VersionSelectorProps {
  currentVersion: string;
  versions: string[];
}

export function VersionSelector({
  currentVersion,
  versions,
}: VersionSelectorProps) {
  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold">
        Version
      </ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.versions}
      >
        {versions.map((version) => {
          const selected = version === currentVersion;

          return (
            <Pressable
              key={version}
              onPress={() =>
                router.push(`/requirements/${version}`)
              }
              style={[
                styles.version,
                selected && styles.selected,
              ]}
            >
              <ThemedText
                style={[
                  styles.versionText,
                  selected && styles.selectedText,
                ]}
              >
                {version}
              </ThemedText>

              {version === versions[0] && (
                <ThemedText style={styles.latest}>
                  Latest
                </ThemedText>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  versions: {
    gap: 8,
  },

  version: {
    minWidth: 72,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#88888840',
    alignItems: 'center',
  },

  selected: {
    borderColor: '#888888',
  },

  versionText: {
    fontSize: 14,
  },

  selectedText: {
    fontWeight: '600',
  },

  latest: {
    fontSize: 10,
    opacity: 0.6,
    marginTop: 2,
  },
});
