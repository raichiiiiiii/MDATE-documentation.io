import { useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VersionSelector } from '@/components/version-selector';

const VERSIONS = [
  'v0.1',
  'v0',
];

export default function RequirementsVersionScreen() {
  const { version } = useLocalSearchParams<{
    version: string;
  }>();

  const currentVersion = Array.isArray(version)
    ? version[0]
    : version;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* =========================================================
            HEADER
        ========================================================= */}
        <View style={styles.header}>
          <ThemedText type="title">
            Software Requirements
          </ThemedText>

          <ThemedText style={styles.description}>
            Software requirements specification, domain requirements,
            epics, and user stories for the project.
          </ThemedText>
        </View>

        {/* =========================================================
            VERSION SELECTOR
        ========================================================= */}
        <VersionSelector
          currentVersion={currentVersion}
          versions={VERSIONS}
        />

        {/* =========================================================
            DOCUMENT HEADER
        ========================================================= */}
        <View style={styles.document}>
          <ThemedText type="subtitle">
            Version {currentVersion}
          </ThemedText>

          <ThemedText style={styles.updated}>
            Software Requirements Specification
          </ThemedText>

          {/* =======================================================
              1. FUNCTIONAL REQUIREMENTS
          ======================================================= */}
          <RequirementSection
            number="1"
            title="Functional Requirements"
          >
            {/* User Authentication */}
            <RequirementItem
              title="User Authentication"
              description="The system should allow users to log in using username and password."
            />

            {/* Report Generation */}
            <RequirementItem
              title="Report Generation"
              description="The software should be able to generate user engagement and training module retention reports for a specified date range."
            />

            {/* Voice Interaction */}
            <RequirementItem
              title="Voice Interaction"
              description="The system should have voice interaction services to guide the user and score them through the module."
            />
          </RequirementSection>

          {/* =======================================================
              2. NON-FUNCTIONAL REQUIREMENTS
          ======================================================= */}
          <RequirementSection
            number="2"
            title="Non-Functional Requirements"
          >
            {/* Voice latency */}
            <RequirementItem
              title="Voice Interaction Latency"
              description="The voice interaction service should have a delay of no more than 200ms."
            />

            {/* Availability / Global access */}
            <RequirementItem
              title="Availability"
              description="The system should be accessible to people around the world and should not be region locked."
            />

            {/* Throughput */}
            <RequirementItem
              title="Transaction Processing"
              description="The system should be able to process 1000 transactions per second."
            />

            {/* Accessibility */}
            <RequirementItem
              title="Accessibility"
              description="The software should provide an aphasia-friendly user interface."
            />

            {/* Uptime */}
            <RequirementItem
              title="System Uptime"
              description="The system should maintain 90% uptime."
            />

            {/* Encryption */}
            <RequirementItem
              title="Data Confidentiality"
              description="Confidential data must be encrypted during transmission and while stored."
            />

            {/* Cross platform */}
            <RequirementItem
              title="Cross-Platform Support"
              description="The software should be able to run on iOS, Android, and web platforms."
            />
          </RequirementSection>

          {/* =======================================================
              3. DOMAIN REQUIREMENTS
          ======================================================= */}
          <RequirementSection
            number="3"
            title="Domain Requirements"
          >
            {/* Healthcare */}
            <RequirementItem
              title="Healthcare"
              description="The system should adhere to regulations regarding patient data."
            />

            {/* E-Commerce */}
            <RequirementItem
              title="E-Commerce"
              description="The software should support various payment gateways such as PayPal."
            />
          </RequirementSection>

          {/* =======================================================
              4. EPICS
          ======================================================= */}
          <RequirementSection
            number="4"
            title="Epics"
          >
            {/* =====================================================
                EPIC 1
            ===================================================== */}
            <Epic
              id="EPIC-01"
              title="Subscription Features"
            >
              <UserStory
                id="US-01"
                text="User can subscribe for full service access."
              />

              <NestedUserStory
                id="US-01.1"
                text="User can enter their credentials with their payment service."
              />

              <NestedUserStory
                id="US-01.2"
                text="User gets full access once their payment is completed and authenticated."
              />
            </Epic>

            {/* =====================================================
                EPIC 2
            ===================================================== */}
            <Epic
              id="EPIC-02"
              title="Authorization Features"
            >
              <UserStory
                id="US-02"
                text="User can register an account."
              />

              <NestedUserStory
                id="US-02.1"
                text="User can link their account with existing email services such as Google Mail and Outlook."
              />

              <NestedUserStory
                id="US-02.2"
                text="User can request authentication of their registration through email."
              />

              <NestedUserStory
                id="US-02.3"
                text="User can request account retrieval if they forget their credentials."
              />
            </Epic>

            {/* =====================================================
                EPIC 3
            ===================================================== */}
            <Epic
              id="EPIC-03"
              title="Training Modules"
            >
              <UserStory
                id="US-03"
                text="Developer can design training modules."
              />

              <UserStory
                id="US-04"
                text="User can decide which category of training modules they want to go through."
              />

              <UserStory
                id="US-05"
                text="User can receive a reward for proceeding through and completing a training module."
              />

              <NestedUserStory
                id="US-05.1"
                text="User can use the reward to purchase items within the system, such as game accessories."
              />

              <NestedUserStory
                id="US-05.2"
                text="User can use the reward to redeem discounted food from partnered vendors."
              />

              <UserStory
                id="US-06"
                text="User can see their rank based on the score earned throughout their module progress."
              />

              <UserStory
                id="US-07"
                text="User can save their progress and continue the training later."
              />
            </Epic>

            {/* =====================================================
                EPIC 4
            ===================================================== */}
            <Epic
              id="EPIC-04"
              title="Voice Interaction Feature"
            >
              <UserStory
                id="US-08"
                text="The voice interaction model can recognize sound in binary format and interpret its meaning as text."
              />

              <UserStory
                id="US-09"
                text="The voice interaction model can speak during training mode."
              />

              <UserStory
                id="US-10"
                text="The voice interaction model can provide a confidentiality score during training mode."
              />

              <UserStory
                id="US-11"
                text="The voice interaction model can improve its speech pattern recognition over time."
              />
            </Epic>
          </RequirementSection>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

/* ===============================================================
   REQUIREMENT SECTION
=============================================================== */

function RequirementSection({
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
      <ThemedText type="subtitle">
        {number}. {title}
      </ThemedText>

      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );
}

/* ===============================================================
   REQUIREMENT ITEM
=============================================================== */

function RequirementItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.requirementItem}>
      <ThemedText type="defaultSemiBold">
        {title}
      </ThemedText>

      <ThemedText style={styles.body}>
        {description}
      </ThemedText>
    </View>
  );
}

/* ===============================================================
   EPIC
=============================================================== */

function Epic({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.epic}>
      <View style={styles.epicHeader}>
        <ThemedText type="defaultSemiBold">
          {id}
        </ThemedText>

        <ThemedText type="defaultSemiBold">
          {title}
        </ThemedText>
      </View>

      <View style={styles.epicContent}>
        {children}
      </View>
    </View>
  );
}

/* ===============================================================
   USER STORY
=============================================================== */

function UserStory({
  id,
  text,
}: {
  id: string;
  text: string;
}) {
  return (
    <View style={styles.userStory}>
      <ThemedText type="defaultSemiBold">
        {id}
      </ThemedText>

      <ThemedText style={styles.body}>
        {text}
      </ThemedText>
    </View>
  );
}

/* ===============================================================
   NESTED USER STORY
=============================================================== */

function NestedUserStory({
  id,
  text,
}: {
  id: string;
  text: string;
}) {
  return (
    <View style={styles.nestedUserStory}>
      <ThemedText type="defaultSemiBold">
        {id}
      </ThemedText>

      <ThemedText style={styles.body}>
        {text}
      </ThemedText>
    </View>
  );
}

/* ===============================================================
   STYLES
=============================================================== */

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
    marginBottom: 24,
  },

  description: {
    marginTop: 10,
    opacity: 0.7,
    lineHeight: 24,
  },

  document: {
    marginTop: 32,
  },

  updated: {
    marginTop: 6,
    opacity: 0.5,
  },

  /* Main requirement sections */
  section: {
    marginTop: 40,
  },

  sectionContent: {
    marginTop: 20,
  },

  /* Individual requirement */
  requirementItem: {
    marginBottom: 24,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#88888840',
  },

  body: {
    lineHeight: 24,
    opacity: 0.85,
    marginTop: 6,
  },

  /* Epic */
  epic: {
    marginBottom: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: '#88888840',
    borderRadius: 12,
  },

  epicHeader: {
    gap: 4,
    marginBottom: 16,
  },

  epicContent: {
    gap: 16,
  },

  /* User story */
  userStory: {
    paddingLeft: 8,
  },

  /* Nested user story */
  nestedUserStory: {
    marginLeft: 24,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#88888830',
  },
});
