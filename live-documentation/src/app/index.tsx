import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ExternalLink } from '@/components/external-link';

export default function IntroductionScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">
            Project Documentation
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Live documentation for the project scope, requirements,
            architecture, and implementation details.
          </ThemedText>
        </View>

        {/* Introduction */}
        <View style={styles.section}>
          <ThemedText type="subtitle">
            Introduction
          </ThemedText>

          <ThemedText style={styles.body}>
            This documentation provides a centralized and continuously
            updated reference for the project.
          </ThemedText>

          <ThemedText style={styles.body}>
            It contains the project scope, software requirements,
            top-level architecture, and detailed low-level design.
          </ThemedText>
        </View>

        {/* Scope */}
        <View style={styles.section}>
          <ThemedText type="subtitle">
            Project Scope
          </ThemedText>

          <ThemedText style={styles.body}>
            The documentation covers the following areas:
          </ThemedText>

          <View style={styles.list}>
            <ThemedText style={styles.listItem}>
              ¿ Project introduction and objectives
            </ThemedText>

            <ThemedText style={styles.listItem}>
              ¿ Software requirements and user stories
            </ThemedText>

            <ThemedText style={styles.listItem}>
              ¿ System architecture and top-level design
            </ThemedText>

            <ThemedText style={styles.listItem}>
              ¿ Detailed component and implementation design
            </ThemedText>
          </View>
        </View>

        {/* Documentation */}
        <View style={styles.section}>
          <ThemedText type="subtitle">
            Documentation
          </ThemedText>

          <View style={styles.navigation}>
            <DocumentationLink
              href="/requirements"
              title="Software Requirements"
              description="Functional requirements, non-functional requirements, user stories, and requirement versions."
            />

            <DocumentationLink
              href="/tld"
              title="Top Level Design"
              description="System architecture, major components, data flow, and deployment structure."
            />

            <DocumentationLink
              href="/lld"
              title="Low Level Design"
              description="Detailed component design, APIs, database structures, and implementation details."
            />
          </View>
        </View>

        {/* External resources */}
        <View style={styles.section}>
          <ThemedText type="subtitle">
            External Resources
          </ThemedText>

          <View style={styles.externalLinks}>
            <ExternalLink href="https://github.com/">
              GitHub
            </ExternalLink>

            <ExternalLink href="https://www.linkedin.com/">
              LinkedIn
            </ExternalLink>

            <ExternalLink href="https://discord.com/">
              Discord
            </ExternalLink>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function DocumentationLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href as any} asChild>
      <Pressable style={styles.card}>
        <ThemedText type="defaultSemiBold">
          {title}
        </ThemedText>

        <ThemedText style={styles.cardDescription}>
          {description}
        </ThemedText>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    width: '100%',
    maxWidth: 1000,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 80,
  },

  header: {
    marginBottom: 40,
  },

  subtitle: {
    marginTop: 12,
    opacity: 0.7,
    lineHeight: 24,
    maxWidth: 750,
  },

  section: {
    marginBottom: 40,
  },

  body: {
    marginTop: 12,
    lineHeight: 24,
    opacity: 0.85,
  },

  list: {
    marginTop: 12,
    gap: 8,
  },

  listItem: {
    lineHeight: 24,
    opacity: 0.85,
  },

  navigation: {
    marginTop: 16,
    gap: 12,
  },

  card: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#88888840',
    borderRadius: 12,
  },

  cardDescription: {
    marginTop: 6,
    opacity: 0.7,
    lineHeight: 21,
  },

  externalLinks: {
    marginTop: 16,
    gap: 12,
  },

  cardPressable: {
    opacity: 0.8,
  },
});
