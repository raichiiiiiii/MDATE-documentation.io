import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LLDScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title">
            Low Level Design
          </ThemedText>

          <ThemedText style={styles.description}>
            Detailed technical design and implementation
            specifications.
          </ThemedText>
        </View>

        <Section
          number="1"
          title="Component Design"
        >
          <ThemedText style={styles.body}>
            Detailed design of individual application and
            infrastructure components.
          </ThemedText>
        </Section>

        <Section
          number="2"
          title="Module Design"
        >
          <ThemedText style={styles.body}>
            Detailed responsibilities, interfaces, inputs,
            outputs, and dependencies of individual modules.
          </ThemedText>
        </Section>

        <Section
          number="3"
          title="Class and Interface Design"
        >
          <ThemedText style={styles.body}>
            Document important classes, interfaces, types,
            relationships, and responsibilities.
          </ThemedText>
        </Section>

        <Section
          number="4"
          title="Database Schema"
        >
          <ThemedText style={styles.body}>
            Document tables, fields, relationships, indexes,
            constraints, and other database structures.
          </ThemedText>
        </Section>

        <Section
          number="5"
          title="API Specification"
        >
          <ThemedText style={styles.body}>
            Document API endpoints, request parameters,
            response structures, authentication, and errors.
          </ThemedText>
        </Section>

        <Section
          number="6"
          title="Sequence Diagrams"
        >
          <ThemedText style={styles.body}>
            Describe the sequence of interactions between
            system components for important use cases.
          </ThemedText>
        </Section>

        <Section
          number="7"
          title="Algorithms"
        >
          <ThemedText style={styles.body}>
            Document important algorithms and processing logic
            used by the application.
          </ThemedText>
        </Section>

        <Section
          number="8"
          title="Error Handling"
        >
          <ThemedText style={styles.body}>
            Document expected failures, error states,
            validation behaviour, and recovery procedures.
          </ThemedText>
        </Section>
      </ScrollView>
    </ThemedView>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <ThemedText type="defaultSemiBold">
        {number}. {title}
      </ThemedText>

      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
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
    marginBottom: 32,
  },

  description: {
    marginTop: 10,
    opacity: 0.7,
    lineHeight: 24,
  },

  section: {
    marginBottom: 30,
  },

  sectionContent: {
    marginTop: 10,
  },

  body: {
    lineHeight: 24,
    opacity: 0.85,
  },
});
