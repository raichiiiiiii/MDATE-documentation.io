import { useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { VersionSelector } from '@/components/version-selector';

/* ===============================================================
   AVAILABLE VERSIONS
=============================================================== */

const VERSIONS = [
  'v0.1',
  'v0',
];

/* ===============================================================
   VERSION DATA
=============================================================== */

const CURRENT_VERSION = 'v0.1';

/* ===============================================================
   TYPES
=============================================================== */

interface FunctionalRequirement {
  id: string;
  title: string;
  items: string[];
}

interface NonFunctionalItem {
  id: string;
  title: string;
  items: string[];
}

interface NonFunctionalCategory {
  title: string;
  items: NonFunctionalItem[];
}

interface DomainRequirement {
  id: string;
  title: string;
  items: string[];
}

interface UserStory {
  id: string;
  text: string;
}

interface Feature {
  id: string;
  title: string;
  userStories: UserStory[];
}

interface Epic {
  id: string;
  title: string;
  features: Feature[];
}

/* ===============================================================
   1. FUNCTIONAL REQUIREMENTS
=============================================================== */

const FUNCTIONAL_REQUIREMENTS: FunctionalRequirement[] = [
  {
    id: 'FR-01',
    title: 'User Authentication',
    items: [
      'The system shall allow users to register an account using an email address and password.',
      'The system shall allow registered users to log in using their credentials.',
      'The system shall allow users to log out securely.',
      'The system shall support account verification through email.',
      'The system shall allow users to reset forgotten passwords through a verified email address.',
      'The system shall prevent access to protected features when the user is not authenticated.',
      'The system shall support third-party authentication providers such as Google and Microsoft.',
      'The system shall maintain a user session across supported platforms.',
    ],
  },

  {
    id: 'FR-02',
    title: 'User Profile and Account Management',
    items: [
      'The system shall allow users to view and modify their profile information.',
      'The system shall allow users to configure accessibility and voice-interaction preferences.',
      'The system shall allow users to change their password.',
      'The system shall allow users to manage linked authentication providers.',
      'The system shall allow users to delete or deactivate their account.',
      'The system shall retain only the minimum information required for system operation.',
    ],
  },

  {
    id: 'FR-03',
    title: 'Training Module Management',
    items: [
      'The system shall allow authorized developers/administrators to create training modules.',
      'The system shall allow administrators to edit, publish, unpublish, and archive training modules.',
    ],
  },

  {
    id: 'FR-04',
    title: 'Training Module Selection',
    items: [
      'The system shall allow users to browse available training modules.',
      'The system shall allow users to filter modules by category.',
      'The system shall allow users to search for a specific module.',
      'The system shall display the user\'s progress for each module.',
      'The system shall indicate whether a module is not started, in progress, completed, or locked/unavailable.',
    ],
  },

  {
    id: 'FR-05',
    title: 'Training Progress',
    items: [
      'The system shall automatically save the user\'s training progress.',
      'Users shall be able to leave a module and resume it later.',
      'The system shall record the user\'s completed activities.',
      'The system shall record scores obtained from each activity.',
      'The system shall record the completion time and date.',
      'The system shall prevent users from losing completed progress because of an interrupted connection.',
      'The system shall synchronize progress between supported devices.',
    ],
  },

  {
    id: 'FR-06',
    title: 'Scoring and Evaluation',
    items: [
      'The system shall calculate a user\'s score based on predefined evaluation criteria.',
      'The system shall provide feedback after an activity is completed.',
      'The system shall calculate module completion scores.',
      'The system shall maintain the user\'s cumulative score.',
      'The system shall maintain historical scores for completed modules.',
      'The system shall distinguish between attempt score, module score, and overall score.',
    ],
  },

  {
    id: 'FR-07',
    title: 'Rewards',
    items: [
      'The system shall award rewards when users satisfy predefined completion criteria.',
      'The system shall maintain the user\'s reward balance.',
      'Users shall be able to view their available rewards.',
      'Users shall be able to redeem eligible rewards.',
      'The system shall prevent users from redeeming the same reward multiple times when the reward is single-use.',
      'The system shall record all reward transactions.',
      'The system shall support rewards such as in-system/game accessories, discounts, and partner-vendor vouchers.',
      'The system shall notify users when they receive a reward.',
    ],
  },

  {
    id: 'FR-08',
    title: 'Ranking / Leaderboard',
    items: [
      'The system shall calculate user rankings based on predefined scoring rules.',
      'The system shall allow users to view their current rank.',
      'The system shall allow users to view their accumulated score.',
      'The system shall support leaderboard filtering such as global, regional, training category, and time period.',
      'The system shall prevent private user information from being exposed through the leaderboard.',
    ],
  },

  {
    id: 'FR-09',
    title: 'Voice Interaction',
    items: [
      'The system shall provide voice interaction during supported training activities.',
      'The system shall capture audio input from the user\'s microphone.',
      'The system shall convert supported speech input into text.',
      'The system shall interpret the user\'s response according to the current training activity.',
      'The system shall provide spoken instructions to the user.',
      'The system shall provide spoken feedback during training.',
      'The system shall allow users to repeat instructions.',
      'The system shall allow users to disable voice interaction and use an alternative input method.',
      'The system shall provide an indication when the system is listening to the user.',
      'The system shall handle unintelligible or ambiguous speech by requesting the user to repeat their response.',
    ],
  },

  {
    id: 'FR-10',
    title: 'Voice-Based Assessment',
    items: [
      'The system shall evaluate the user\'s spoken response against predefined criteria.',
      'The system shall generate a score based on the configured assessment rules.',
      'The system shall provide feedback explaining the result where appropriate.',
      'The system shall distinguish between speech recognition confidence and training performance score.',
      'The system shall not treat low speech-recognition confidence as automatically equivalent to poor user performance.',
    ],
  },

  {
    id: 'FR-11',
    title: 'Reporting',
    items: [
      'Authorized users shall be able to generate reports for a specified date range.',
      'Reports shall include user engagement metrics.',
      'Reports shall include training-module completion rates.',
      'Reports shall include module retention/progress metrics.',
      'Reports shall include average scores.',
      'Reports shall include reward redemption statistics.',
      'Reports shall allow filtering by training module and category.',
      'Reports shall support export to a standard format such as CSV or PDF.',
    ],
  },

  {
    id: 'FR-12',
    title: 'Payment and Subscription',
    items: [
      'The system shall allow users to subscribe to paid services.',
      'The system shall display available subscription plans.',
      'The system shall redirect or communicate with supported payment gateways.',
      'The system shall verify successful payment before granting subscription privileges.',
      'The system shall update subscription status after successful payment.',
      'The system shall handle failed, cancelled, or expired payments.',
      'The system shall maintain a transaction history.',
      'The system shall support payment providers such as PayPal where available.',
      'The system shall not store sensitive payment credentials unless explicitly required and appropriately secured.',
    ],
  },
];

/* ===============================================================
   2. NON-FUNCTIONAL REQUIREMENTS
=============================================================== */

const NON_FUNCTIONAL_REQUIREMENTS: NonFunctionalCategory[] = [
  {
    title: 'Performance',
    items: [
      {
        id: 'NFR-01',
        title: 'Voice Response Latency',
        items: [
          'The system shall acknowledge detected speech input within 200 ms and shall begin processing the request immediately.',
        ],
      },
      {
        id: 'NFR-02',
        title: 'Transaction Throughput',
        items: [
          'The backend shall support at least 1,000 transactions per second (TPS) under the specified load-test configuration.',
          'The system shall maintain acceptable response times while operating at the target throughput.',
          'Performance testing shall identify the maximum sustainable TPS before service degradation.',
        ],
      },
      {
        id: 'NFR-03',
        title: 'Response Time',
        items: [
          '95% of normal API requests shall receive a response within an agreed threshold, e.g. 500 ms.',
          'Long-running operations such as report generation shall execute asynchronously where appropriate.',
        ],
      },
    ],
  },

  {
    title: 'Availability and Reliability',
    items: [
      {
        id: 'NFR-04',
        title: 'Availability',
        items: [
          'The system shall provide a minimum of 99.0% monthly availability.',
          'For a 30-day month, this corresponds to approximately 7 hours and 12 minutes of maximum downtime.',
        ],
      },
      {
        id: 'NFR-05',
        title: 'Fault Recovery',
        items: [
          'The system shall recover from temporary service failures without corrupting user progress.',
          'Training progress shall be persisted before being considered completed.',
          'The system shall retry transient failures where appropriate.',
          'The system shall provide meaningful error messages when recovery is not possible.',
        ],
      },
    ],
  },

  {
    title: 'Accessibility Requirements',
    items: [
      {
        id: 'NFR-06',
        title: 'Aphasia-Friendly Interface',
        items: [
          'The system shall provide an interface designed to reduce communication and comprehension difficulties.',
          'Use short and simple sentences.',
          'Avoid unnecessary technical terminology.',
          'Use clear icons together with text.',
          'Maintain consistent placement of controls.',
          'Provide visual confirmation of important actions.',
          'Provide audio instructions where appropriate.',
          'Allow users to replay instructions.',
          'Avoid relying exclusively on color to communicate information.',
          'Provide sufficiently large interactive controls.',
          'Minimize the amount of information displayed simultaneously.',
          'Provide predictable navigation.',
          'Allow users to adjust text size.',
          'Allow users to adjust audio/voice settings.',
          'Provide alternative interaction methods when speech recognition fails.',
        ],
      },
    ],
  },

  {
    title: 'Security Requirements',
    items: [
      {
        id: 'NFR-07',
        title: 'Data Encryption',
        items: [
          'Confidential data shall be encrypted during transmission using an industry-standard secure transport protocol such as TLS.',
          'Confidential data stored by the system shall be encrypted at rest.',
          'Passwords shall never be stored in plaintext.',
          'Passwords shall be stored using an appropriate password-hashing algorithm.',
          'Authentication tokens shall have an appropriate expiration mechanism.',
          'Administrative functions shall require appropriate authorization.',
          'The system shall maintain an audit log for security-sensitive operations.',
        ],
      },
      {
        id: 'NFR-08',
        title: 'Access Control',
        items: [
          'Users shall only be able to access resources permitted by their role.',
          'Administrators shall have access to management functions.',
          'Normal users shall not be able to modify training-module definitions.',
          'The system shall validate authorization on the server side rather than relying solely on UI restrictions.',
        ],
      },
    ],
  },

  {
    title: 'Cross-Platform Requirements',
    items: [
      {
        id: 'NFR-09',
        title: 'Cross-Platform Support',
        items: [
          'The software shall support web browsers.',
          'The software shall support Android devices.',
          'The software shall support iOS devices.',
        ],
      },
    ],
  },

  {
    title: 'Global Accessibility / Connectivity',
    items: [
      {
        id: 'NFR-10',
        title: 'Global Accessibility',
        items: [
          'The system shall be accessible through the public Internet.',
          'The system shall not restrict access based solely on the user\'s geographical region unless required by law, payment-provider restrictions, or deployment constraints.',
          'The system shall support users from different time zones.',
          'Timestamps shall be stored using a consistent time standard such as UTC.',
          'The interface shall support internationalization where required.',
        ],
      },
    ],
  },
];

/* ===============================================================
   3. DOMAIN REQUIREMENTS
=============================================================== */

const DOMAIN_REQUIREMENTS: DomainRequirement[] = [
  {
    id: 'DR-01',
    title: 'Healthcare Domain - Patient Data Protection',
    items: [
      'The system shall protect personally identifiable and health-related information.',
      'Access to patient-related information shall be restricted according to user roles.',
      'Patient data shall not be exposed to unauthorized users.',
      'The system shall maintain an audit trail for access to sensitive information.',
      'Data storage and processing shall comply with applicable healthcare and privacy regulations in the jurisdictions where the system operates.',
    ],
  },

  {
    id: 'DR-02',
    title: 'E-Commerce Domain - Payment Processing',
    items: [
      'The system shall support integration with third-party payment providers.',
      'The system shall support payment confirmation.',
      'The system shall handle successful, failed, cancelled, and refunded transactions.',
      'The system shall maintain transaction records.',
      'Payment information shall be handled according to applicable payment-security requirements.',
      'The system shall support providers such as PayPal.',
    ],
  },
];

/* ===============================================================
   4. EPICS
=============================================================== */

const EPICS: Epic[] = [
  /* =============================================================
     EPIC 01
  ============================================================= */
  {
    id: 'EPIC-01',
    title: 'Account and Identity Management',
    features: [
      {
        id: 'F-01.01',
        title: 'User Registration',
        userStories: [
          {
            id: 'US-01.01.01',
            text: 'As a new user, I want to create an account using my email and password so that I can access the platform.',
          },
          {
            id: 'US-01.01.02',
            text: 'As a new user, I want the system to validate my registration details so that invalid account information is rejected.',
          },
          {
            id: 'US-01.01.03',
            text: 'As a new user, I want to receive confirmation that my account has been created so that I know the registration was successful.',
          },
        ],
      },
      {
        id: 'F-01.02',
        title: 'User Login',
        userStories: [
          {
            id: 'US-01.02.01',
            text: 'As a registered user, I want to log in using my credentials so that I can access my account.',
          },
          {
            id: 'US-01.02.02',
            text: 'As a registered user, I want the system to reject invalid credentials so that unauthorized users cannot access my account.',
          },
          {
            id: 'US-01.02.03',
            text: 'As a registered user, I want to remain logged in securely during my session so that I do not have to repeatedly enter my credentials.',
          },
        ],
      },
      {
        id: 'F-01.03',
        title: 'Email Verification',
        userStories: [
          {
            id: 'US-01.03.01',
            text: 'As a new user, I want to verify my email address so that my account can be activated securely.',
          },
          {
            id: 'US-01.03.02',
            text: 'As a new user, I want to request another verification email so that I can complete verification if the original email expires.',
          },
          {
            id: 'US-01.03.03',
            text: 'As a system administrator, I want unverified accounts to have restricted access so that account ownership can be validated.',
          },
        ],
      },
      {
        id: 'F-01.04',
        title: 'Password Recovery',
        userStories: [
          {
            id: 'US-01.04.01',
            text: 'As a registered user, I want to request a password reset so that I can regain access to my account.',
          },
          {
            id: 'US-01.04.02',
            text: 'As a registered user, I want to set a new password using a secure reset link so that my account remains protected.',
          },
          {
            id: 'US-01.04.03',
            text: 'As a system administrator, I want password-reset requests to expire after a defined period so that old reset links cannot be reused.',
          },
        ],
      },
      {
        id: 'F-01.05',
        title: 'Third-Party Authentication',
        userStories: [
          {
            id: 'US-01.05.01',
            text: 'As a user, I want to sign in using a supported third-party identity provider so that I can access the platform without creating another password.',
          },
          {
            id: 'US-01.05.02',
            text: 'As a user, I want my third-party account to be linked to my platform account so that I can use multiple login methods.',
          },
          {
            id: 'US-01.05.03',
            text: 'As a system administrator, I want third-party authentication to use secure authorization protocols so that external authentication remains protected.',
          },
        ],
      },
      {
        id: 'F-01.06',
        title: 'Profile Management',
        userStories: [
          {
            id: 'US-01.06.01',
            text: 'As a user, I want to view my profile information so that I can verify my account details.',
          },
          {
            id: 'US-01.06.02',
            text: 'As a user, I want to update my personal information so that my profile remains current.',
          },
          {
            id: 'US-01.06.03',
            text: 'As a user, I want to configure my preferred language and accessibility settings so that the platform matches my needs.',
          },
        ],
      },
      {
        id: 'F-01.07',
        title: 'Account Deactivation',
        userStories: [
          {
            id: 'US-01.07.01',
            text: 'As a user, I want to deactivate my account so that I can stop using the platform.',
          },
          {
            id: 'US-01.07.02',
            text: 'As a user, I want to receive confirmation before account deactivation so that accidental deactivation is avoided.',
          },
          {
            id: 'US-01.07.03',
            text: 'As a system administrator, I want deactivated accounts to be prevented from accessing protected services so that inactive accounts cannot be misused.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 02
  ============================================================= */
  {
    id: 'EPIC-02',
    title: 'Subscription and Payment Management',
    features: [
      {
        id: 'F-02.01',
        title: 'Subscription Plan Management',
        userStories: [
          {
            id: 'US-02.01.01',
            text: 'As a user, I want to view available subscription plans so that I can choose a suitable plan.',
          },
          {
            id: 'US-02.01.02',
            text: 'As a user, I want to compare subscription plans so that I can understand the differences between them.',
          },
          {
            id: 'US-02.01.03',
            text: 'As an administrator, I want to create and modify subscription plans so that the platform can offer different service levels.',
          },
        ],
      },
      {
        id: 'F-02.02',
        title: 'Subscription Purchase',
        userStories: [
          {
            id: 'US-02.02.01',
            text: 'As a user, I want to select a subscription plan so that I can purchase access to its training content.',
          },
          {
            id: 'US-02.02.02',
            text: 'As a user, I want to review my selected subscription before payment so that I can confirm the purchase details.',
          },
          {
            id: 'US-02.02.03',
            text: 'As a user, I want to receive confirmation after purchasing a subscription so that I know access has been granted.',
          },
        ],
      },
      {
        id: 'F-02.03',
        title: 'Payment Processing',
        userStories: [
          {
            id: 'US-02.03.01',
            text: 'As a user, I want to pay for my subscription using a supported payment method so that I can complete my purchase.',
          },
          {
            id: 'US-02.03.02',
            text: 'As a user, I want the payment amount and currency to be displayed before payment so that I know what I will be charged.',
          },
          {
            id: 'US-02.03.03',
            text: 'As a system administrator, I want payment transactions to be securely processed so that financial information is protected.',
          },
        ],
      },
      {
        id: 'F-02.04',
        title: 'Payment Verification',
        userStories: [
          {
            id: 'US-02.04.01',
            text: 'As a user, I want the system to verify my payment before activating my subscription so that unauthorized access is prevented.',
          },
          {
            id: 'US-02.04.02',
            text: 'As an administrator, I want payment status to be recorded so that successful and unsuccessful transactions can be tracked.',
          },
          {
            id: 'US-02.04.03',
            text: 'As an administrator, I want failed payment verification to prevent subscription activation so that invalid transactions cannot grant access.',
          },
        ],
      },
      {
        id: 'F-02.05',
        title: 'Subscription Activation',
        userStories: [
          {
            id: 'US-02.05.01',
            text: 'As a user, I want my subscription to become active after successful payment so that I can immediately use the purchased services.',
          },
          {
            id: 'US-02.05.02',
            text: 'As a user, I want to see my current subscription status so that I know what services I can access.',
          },
          {
            id: 'US-02.05.03',
            text: 'As an administrator, I want subscription activation dates to be recorded so that subscription periods can be tracked.',
          },
        ],
      },
      {
        id: 'F-02.06',
        title: 'Subscription Renewal',
        userStories: [
          {
            id: 'US-02.06.01',
            text: 'As a subscriber, I want my subscription to renew automatically when enabled so that I can continue using the service without interruption.',
          },
          {
            id: 'US-02.06.02',
            text: 'As a subscriber, I want to know when my subscription will renew so that I can manage my payment.',
          },
          {
            id: 'US-02.06.03',
            text: 'As a subscriber, I want to be notified when renewal fails so that I can update my payment method.',
          },
        ],
      },
      {
        id: 'F-02.07',
        title: 'Subscription Cancellation',
        userStories: [
          {
            id: 'US-02.07.01',
            text: 'As a subscriber, I want to cancel my subscription so that I can stop future recurring charges.',
          },
          {
            id: 'US-02.07.02',
            text: 'As a subscriber, I want to know when cancellation takes effect so that I understand how long I retain access.',
          },
          {
            id: 'US-02.07.03',
            text: 'As an administrator, I want cancellation status to be recorded so that subscription history remains accurate.',
          },
        ],
      },
      {
        id: 'F-02.08',
        title: 'Payment History',
        userStories: [
          {
            id: 'US-02.08.01',
            text: 'As a user, I want to view my payment history so that I can track my previous purchases.',
          },
          {
            id: 'US-02.08.02',
            text: 'As a user, I want to view payment details for an individual transaction so that I can verify a charge.',
          },
          {
            id: 'US-02.08.03',
            text: 'As an administrator, I want to retrieve payment records so that financial transactions can be audited.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 03
  ============================================================= */
  {
    id: 'EPIC-03',
    title: 'Training Module Management',
    features: [
      {
        id: 'F-03.01',
        title: 'Training Module Creation',
        userStories: [
          {
            id: 'US-03.01.01',
            text: 'As a content administrator, I want to create a training module so that new training content can be added to the platform.',
          },
          {
            id: 'US-03.01.02',
            text: 'As a content administrator, I want to define module activities and instructions so that users know what to do during training.',
          },
          {
            id: 'US-03.01.03',
            text: 'As a content administrator, I want to define the target audience of a module so that suitable users can access it.',
          },
        ],
      },
      {
        id: 'F-03.02',
        title: 'Training Module Editing',
        userStories: [
          {
            id: 'US-03.02.01',
            text: 'As a content administrator, I want to edit training module content so that outdated information can be corrected.',
          },
          {
            id: 'US-03.02.02',
            text: 'As a content administrator, I want to modify module activities so that training exercises can be improved.',
          },
          {
            id: 'US-03.02.03',
            text: 'As a content administrator, I want changes to be saved before publishing so that incomplete edits are not exposed to users.',
          },
        ],
      },
      {
        id: 'F-03.03',
        title: 'Training Module Publishing',
        userStories: [
          {
            id: 'US-03.03.01',
            text: 'As a content administrator, I want to publish a completed training module so that users can access it.',
          },
          {
            id: 'US-03.03.02',
            text: 'As a content administrator, I want to preview a module before publishing so that I can verify its content.',
          },
          {
            id: 'US-03.03.03',
            text: 'As a content administrator, I want to control when a module becomes available so that content can be released as planned.',
          },
        ],
      },
      {
        id: 'F-03.04',
        title: 'Training Module Archiving',
        userStories: [
          {
            id: 'US-03.04.01',
            text: 'As a content administrator, I want to archive an obsolete module so that it is no longer offered to new users.',
          },
          {
            id: 'US-03.04.02',
            text: 'As a content administrator, I want historical training records to remain available after a module is archived so that previous user activity is preserved.',
          },
        ],
      },
      {
        id: 'F-03.05',
        title: 'Module Scoring Configuration',
        userStories: [
          {
            id: 'US-03.05.01',
            text: 'As a content administrator, I want to define scoring rules for a training module so that user performance can be evaluated.',
          },
          {
            id: 'US-03.05.02',
            text: 'As a content administrator, I want to assign different scores to different activities so that activities can have different levels of importance.',
          },
          {
            id: 'US-03.05.03',
            text: 'As a content administrator, I want to define pass and performance thresholds so that module completion can be evaluated consistently.',
          },
        ],
      },
      {
        id: 'F-03.06',
        title: 'Module Completion Criteria',
        userStories: [
          {
            id: 'US-03.06.01',
            text: 'As a content administrator, I want to define completion requirements so that users know when a module is considered complete.',
          },
          {
            id: 'US-03.06.02',
            text: 'As a content administrator, I want to define minimum scores for completion so that users must meet the required performance level.',
          },
          {
            id: 'US-03.06.03',
            text: 'As a user, I want to see my module completion requirements so that I understand what I must accomplish.',
          },
        ],
      },
      {
        id: 'F-03.07',
        title: 'Module Categorization',
        userStories: [
          {
            id: 'US-03.07.01',
            text: 'As a content administrator, I want to assign categories to training modules so that users can find relevant content.',
          },
          {
            id: 'US-03.07.02',
            text: 'As a user, I want to browse modules by category so that I can find suitable training.',
          },
          {
            id: 'US-03.07.03',
            text: 'As a content administrator, I want to update module categories so that the catalogue remains organized.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 04
  ============================================================= */
  {
    id: 'EPIC-04',
    title: 'Training Experience',
    features: [
      {
        id: 'F-04.01',
        title: 'Training Module Discovery',
        userStories: [
          {
            id: 'US-04.01.01',
            text: 'As a user, I want to browse available training modules so that I can choose what to study.',
          },
          {
            id: 'US-04.01.02',
            text: 'As a user, I want to search for training modules so that I can quickly find relevant content.',
          },
          {
            id: 'US-04.01.03',
            text: 'As a user, I want to view module descriptions before starting so that I can decide whether the module is suitable.',
          },
        ],
      },
      {
        id: 'F-04.02',
        title: 'Training Category Selection',
        userStories: [
          {
            id: 'US-04.02.01',
            text: 'As a user, I want to select a training category so that I can focus on a particular type of training.',
          },
          {
            id: 'US-04.02.02',
            text: 'As a user, I want to see the available modules within a category so that I can select a relevant module.',
          },
        ],
      },
      {
        id: 'F-04.03',
        title: 'Training Session Initialization',
        userStories: [
          {
            id: 'US-04.03.01',
            text: 'As a user, I want to start a training session so that I can begin the selected module.',
          },
          {
            id: 'US-04.03.02',
            text: 'As a user, I want the system to initialize my session with my current progress so that I can continue from the correct state.',
          },
          {
            id: 'US-04.03.03',
            text: 'As a user, I want to receive instructions when a training session starts so that I know how to proceed.',
          },
        ],
      },
      {
        id: 'F-04.04',
        title: 'Training Activity Completion',
        userStories: [
          {
            id: 'US-04.04.01',
            text: 'As a user, I want to complete each training activity so that I can progress through the module.',
          },
          {
            id: 'US-04.04.02',
            text: 'As a user, I want the system to indicate whether my response was accepted so that I understand my progress.',
          },
          {
            id: 'US-04.04.03',
            text: 'As a user, I want to repeat an activity when allowed so that I can improve my performance.',
          },
        ],
      },
      {
        id: 'F-04.05',
        title: 'Training Progress Saving',
        userStories: [
          {
            id: 'US-04.05.01',
            text: 'As a user, I want my training progress to be saved automatically so that I do not lose completed work.',
          },
          {
            id: 'US-04.05.02',
            text: 'As a user, I want to view my current progress so that I know how much of the module I have completed.',
          },
        ],
      },
      {
        id: 'F-04.06',
        title: 'Training Session Resumption',
        userStories: [
          {
            id: 'US-04.06.01',
            text: 'As a user, I want to resume an unfinished training session so that I can continue where I stopped.',
          },
          {
            id: 'US-04.06.02',
            text: 'As a user, I want the system to restore my previous training state so that I do not need to repeat completed activities.',
          },
        ],
      },
      {
        id: 'F-04.07',
        title: 'Training Module Completion',
        userStories: [
          {
            id: 'US-04.07.01',
            text: 'As a user, I want the system to recognize when I meet all module requirements so that my training can be marked complete.',
          },
          {
            id: 'US-04.07.02',
            text: 'As a user, I want to receive confirmation when I complete a module so that I know my achievement has been recorded.',
          },
          {
            id: 'US-04.07.03',
            text: 'As a user, I want my completed modules to appear in my training history so that I can track my achievements.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 05
  ============================================================= */
  {
    id: 'EPIC-05',
    title: 'Voice Interaction',
    features: [
      {
        id: 'F-05.01',
        title: 'Speech Capture',
        userStories: [
          {
            id: 'US-05.01.01',
            text: 'As a user, I want the platform to capture my spoken response so that I can interact using my voice.',
          },
          {
            id: 'US-05.01.02',
            text: 'As a user, I want the system to indicate when my voice is being recorded so that I know when to speak.',
          },
          {
            id: 'US-05.01.03',
            text: 'As a user, I want the system to stop capturing my response when I finish speaking so that my response can be processed.',
          },
        ],
      },
      {
        id: 'F-05.02',
        title: 'Speech-to-Text',
        userStories: [
          {
            id: 'US-05.02.01',
            text: 'As a user, I want my speech to be converted into text so that the system can interpret my response.',
          },
          {
            id: 'US-05.02.02',
            text: 'As a user, I want the system to handle unclear speech appropriately so that I can retry when necessary.',
          },
          {
            id: 'US-05.02.03',
            text: 'As an administrator, I want speech-processing results to be available to the training engine so that spoken responses can be evaluated.',
          },
        ],
      },
      {
        id: 'F-05.03',
        title: 'User Response Interpretation',
        userStories: [
          {
            id: 'US-05.03.01',
            text: 'As a user, I want the system to interpret the meaning of my spoken response so that my answer can be evaluated.',
          },
          {
            id: 'US-05.03.02',
            text: 'As a user, I want different valid ways of expressing an answer to be recognized so that I am not required to use one exact phrase.',
          },
          {
            id: 'US-05.03.03',
            text: 'As a content administrator, I want acceptable response patterns to be defined so that response interpretation remains aligned with the training activity.',
          },
        ],
      },
      {
        id: 'F-05.04',
        title: 'Spoken Training Instructions',
        userStories: [
          {
            id: 'US-05.04.01',
            text: 'As a user, I want training instructions to be spoken aloud so that I can follow the exercise without relying entirely on text.',
          },
          {
            id: 'US-05.04.02',
            text: 'As a user, I want spoken instructions to be repeated when requested so that I can hear the instruction again.',
          },
          {
            id: 'US-05.04.03',
            text: 'As a user, I want spoken instructions to correspond to the current activity so that I receive relevant guidance.',
          },
        ],
      },
      {
        id: 'F-05.05',
        title: 'Spoken Performance Feedback',
        userStories: [
          {
            id: 'US-05.05.01',
            text: 'As a user, I want feedback to be spoken aloud so that I can understand my performance without reading.',
          },
          {
            id: 'US-05.05.02',
            text: 'As a user, I want the system to announce my result after an activity so that I immediately understand my performance.',
          },
          {
            id: 'US-05.05.03',
            text: 'As a user, I want spoken feedback to explain mistakes when appropriate so that I can improve.',
          },
        ],
      },
      {
        id: 'F-05.06',
        title: 'Voice-Based Assessment',
        userStories: [
          {
            id: 'US-05.06.01',
            text: 'As a user, I want my spoken response to be assessed against the activity requirements so that my performance can be scored.',
          },
          {
            id: 'US-05.06.02',
            text: 'As a content administrator, I want assessment criteria to be configured for voice activities so that scoring is consistent.',
          },
          {
            id: 'US-05.06.03',
            text: 'As a user, I want my voice-based assessment result to contribute to my module score so that my performance is recorded.',
          },
        ],
      },
      {
        id: 'F-05.07',
        title: 'Unrecognized Speech Handling',
        userStories: [
          {
            id: 'US-05.07.01',
            text: 'As a user, I want to be informed when my speech cannot be understood so that I know I need to respond again.',
          },
          {
            id: 'US-05.07.02',
            text: 'As a user, I want to retry a voice response without restarting the entire activity so that I can continue training efficiently.',
          },
          {
            id: 'US-05.07.03',
            text: 'As a system administrator, I want unrecognized speech events to be logged so that recurring voice-recognition problems can be investigated.',
          },
        ],
      },
      {
        id: 'F-05.08',
        title: 'Voice Preference Configuration',
        userStories: [
          {
            id: 'US-05.08.01',
            text: 'As a user, I want to select a preferred voice so that spoken interactions are easier for me to understand.',
          },
          {
            id: 'US-05.08.02',
            text: 'As a user, I want to adjust speech volume so that spoken feedback is audible.',
          },
          {
            id: 'US-05.08.03',
            text: 'As a user, I want to control the speed of spoken instructions so that I can follow them comfortably.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 06
  ============================================================= */
  {
    id: 'EPIC-06',
    title: 'Scoring and Evaluation',
    features: [
      {
        id: 'F-06.01',
        title: 'Activity Scoring',
        userStories: [
          {
            id: 'US-06.01.01',
            text: 'As a user, I want each completed activity to receive a score so that I can measure my performance.',
          },
          {
            id: 'US-06.01.02',
            text: 'As a content administrator, I want activity scoring rules to be configurable so that different activities can be evaluated appropriately.',
          },
          {
            id: 'US-06.01.03',
            text: 'As a user, I want to see my activity result after submission so that I understand how I performed.',
          },
        ],
      },
      {
        id: 'F-06.02',
        title: 'Module Scoring',
        userStories: [
          {
            id: 'US-06.02.01',
            text: 'As a user, I want scores from activities to contribute to my module score so that my overall performance is measured.',
          },
          {
            id: 'US-06.02.02',
            text: 'As a content administrator, I want the module scoring formula to be configurable so that scoring matches the module design.',
          },
        ],
      },
      {
        id: 'F-06.03',
        title: 'Overall Score Calculation',
        userStories: [
          {
            id: 'US-06.03.01',
            text: 'As a user, I want the system to calculate my overall performance score so that I can track my development.',
          },
          {
            id: 'US-06.03.02',
            text: 'As a user, I want my overall score to update after relevant training activities so that the result reflects my latest performance.',
          },
        ],
      },
      {
        id: 'F-06.04',
        title: 'Performance Feedback',
        userStories: [
          {
            id: 'US-06.04.01',
            text: 'As a user, I want feedback based on my score so that I understand areas that need improvement.',
          },
          {
            id: 'US-06.04.02',
            text: 'As a user, I want feedback to identify successful areas of my performance so that I know what I am doing well.',
          },
          {
            id: 'US-06.04.03',
            text: 'As a content administrator, I want performance feedback rules to be configurable so that feedback matches the training objectives.',
          },
        ],
      },
      {
        id: 'F-06.05',
        title: 'Score History',
        userStories: [
          {
            id: 'US-06.05.01',
            text: 'As a user, I want to view my previous scores so that I can track changes in my performance.',
          },
          {
            id: 'US-06.05.02',
            text: 'As a user, I want to view score history by training module so that I can identify my performance across different areas.',
          },
          {
            id: 'US-06.05.03',
            text: 'As an administrator, I want historical scores to be retained so that performance can be analyzed over time.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 07
  ============================================================= */
  {
    id: 'EPIC-07',
    title: 'Rewards and Gamification',
    features: [
      {
        id: 'F-07.01',
        title: 'Reward Awarding',
        userStories: [
          {
            id: 'US-07.01.01',
            text: 'As a user, I want to receive rewards after meeting defined achievements so that my progress is recognized.',
          },
          {
            id: 'US-07.01.02',
            text: 'As an administrator, I want reward rules to be configured so that achievements can trigger appropriate rewards.',
          },
        ],
      },
      {
        id: 'F-07.02',
        title: 'Reward Catalogue',
        userStories: [
          {
            id: 'US-07.02.01',
            text: 'As a user, I want to view available rewards so that I can understand what I can earn or redeem.',
          },
          {
            id: 'US-07.02.02',
            text: 'As an administrator, I want to create and manage rewards so that the reward catalogue remains current.',
          },
        ],
      },
      {
        id: 'F-07.03',
        title: 'Reward Redemption',
        userStories: [
          {
            id: 'US-07.03.01',
            text: 'As a user, I want to redeem eligible rewards so that I can use the rewards I have earned.',
          },
          {
            id: 'US-07.03.02',
            text: 'As a user, I want to see the requirements for redeeming a reward so that I know whether I am eligible.',
          },
          {
            id: 'US-07.03.03',
            text: 'As a user, I want redemption status to be shown so that I know whether my reward was successfully claimed.',
          },
        ],
      },
      {
        id: 'F-07.04',
        title: 'Game Accessory Rewards',
        userStories: [
          {
            id: 'US-07.04.01',
            text: 'As a user, I want to earn game accessories through training achievements so that my progress can be reflected in the game.',
          },
          {
            id: 'US-07.04.02',
            text: 'As a user, I want to view the game accessories I have earned so that I can manage my rewards.',
          },
        ],
      },
      {
        id: 'F-07.05',
        title: 'Partner Discount Rewards',
        userStories: [
          {
            id: 'US-07.05.01',
            text: 'As a user, I want to redeem eligible partner discounts so that I can receive benefits from participating partners.',
          },
          {
            id: 'US-07.05.02',
            text: 'As an administrator, I want to configure partner discount rewards so that available promotions can be managed.',
          },
        ],
      },
      {
        id: 'F-07.06',
        title: 'Reward Transaction History',
        userStories: [
          {
            id: 'US-07.06.01',
            text: 'As a user, I want to view my reward history so that I can track rewards I earned and redeemed.',
          },
          {
            id: 'US-07.06.02',
            text: 'As an administrator, I want reward transactions to be recorded so that reward activity can be audited.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 08
  ============================================================= */
  {
    id: 'EPIC-08',
    title: 'Ranking and Leaderboard',
    features: [
      {
        id: 'F-08.01',
        title: 'Ranking Calculation',
        userStories: [
          {
            id: 'US-08.01.01',
            text: 'As a user, I want my ranking to be calculated from defined performance criteria so that my position reflects my recorded results.',
          },
          {
            id: 'US-08.01.02',
            text: 'As an administrator, I want ranking criteria to be configurable so that rankings follow the platform rules.',
          },
        ],
      },
      {
        id: 'F-08.02',
        title: 'Leaderboard',
        userStories: [
          {
            id: 'US-08.02.01',
            text: 'As a user, I want to view the leaderboard so that I can see rankings among participating users.',
          },
          {
            id: 'US-08.02.02',
            text: 'As a user, I want my own position to be visible on the leaderboard so that I can understand my current standing.',
          },
        ],
      },
      {
        id: 'F-08.03',
        title: 'Leaderboard Filtering',
        userStories: [
          {
            id: 'US-08.03.01',
            text: 'As a user, I want to filter the leaderboard by relevant categories so that I can compare users within a specific group.',
          },
          {
            id: 'US-08.03.02',
            text: 'As a user, I want to filter leaderboard results by training module so that I can compare performance for a particular module.',
          },
        ],
      },
      {
        id: 'F-08.04',
        title: 'Personal Ranking',
        userStories: [
          {
            id: 'US-08.04.01',
            text: 'As a user, I want to view my current ranking so that I can monitor my position.',
          },
          {
            id: 'US-08.04.02',
            text: 'As a user, I want to view changes in my ranking over time so that I can track my progress relative to other users.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 09
  ============================================================= */
  {
    id: 'EPIC-09',
    title: 'Reporting and Analytics',
    features: [
      {
        id: 'F-09.01',
        title: 'User Engagement Reporting',
        userStories: [
          {
            id: 'US-09.01.01',
            text: 'As an administrator, I want to generate a report of user engagement so that I can understand how actively users interact with the platform.',
          },
          {
            id: 'US-09.01.02',
            text: 'As an administrator, I want to see engagement activity over a selected period so that I can identify changes in usage.',
          },
        ],
      },
      {
        id: 'F-09.02',
        title: 'Training Completion Reporting',
        userStories: [
          {
            id: 'US-09.02.01',
            text: 'As an administrator, I want to generate training completion reports so that I can monitor module completion.',
          },
          {
            id: 'US-09.02.02',
            text: 'As an administrator, I want to compare completion rates across modules so that I can identify modules with different completion patterns.',
          },
        ],
      },
      {
        id: 'F-09.03',
        title: 'Training Retention Reporting',
        userStories: [
          {
            id: 'US-09.03.01',
            text: 'As an administrator, I want to generate training retention reports so that I can measure whether users continue participating in training.',
          },
          {
            id: 'US-09.03.02',
            text: 'As an administrator, I want retention data over a specified period so that I can analyze user continuation patterns.',
          },
        ],
      },
      {
        id: 'F-09.04',
        title: 'Score Reporting',
        userStories: [
          {
            id: 'US-09.04.01',
            text: 'As an administrator, I want to generate score reports so that I can analyze user performance.',
          },
          {
            id: 'US-09.04.02',
            text: 'As an administrator, I want to compare scores across modules so that I can identify performance differences.',
          },
        ],
      },
      {
        id: 'F-09.05',
        title: 'Reward Reporting',
        userStories: [
          {
            id: 'US-09.05.01',
            text: 'As an administrator, I want to generate reward reports so that I can monitor reward distribution and usage.',
          },
          {
            id: 'US-09.05.02',
            text: 'As an administrator, I want to view reward redemption activity so that I can monitor the effectiveness of the reward system.',
          },
        ],
      },
      {
        id: 'F-09.06',
        title: 'Date Range Filtering',
        userStories: [
          {
            id: 'US-09.06.01',
            text: 'As an administrator, I want to specify a date range when generating a report so that I can analyze a particular period.',
          },
          {
            id: 'US-09.06.02',
            text: 'As an administrator, I want report results to respect the selected start and end dates so that the report contains only relevant data.',
          },
        ],
      },
      {
        id: 'F-09.07',
        title: 'Report Export',
        userStories: [
          {
            id: 'US-09.07.01',
            text: 'As an administrator, I want to export reports so that I can use the information outside the platform.',
          },
          {
            id: 'US-09.07.02',
            text: 'As an administrator, I want exported reports to preserve the selected filters and date range so that the exported information matches the generated report.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 10
  ============================================================= */
  {
    id: 'EPIC-10',
    title: 'Accessibility',
    features: [
      {
        id: 'F-10.01',
        title: 'Aphasia-Friendly Interface',
        userStories: [
          {
            id: 'US-10.01.01',
            text: 'As a user with aphasia, I want the interface to use clear and simple language so that I can understand instructions more easily.',
          },
          {
            id: 'US-10.01.02',
            text: 'As a user with aphasia, I want important actions and information to be visually distinct so that I can identify them more easily.',
          },
          {
            id: 'US-10.01.03',
            text: 'As a user with aphasia, I want unnecessary interface content to be minimized so that I can focus on the current task.',
          },
        ],
      },
      {
        id: 'F-10.02',
        title: 'Text Size Adjustment',
        userStories: [
          {
            id: 'US-10.02.01',
            text: 'As a user, I want to increase text size so that I can read interface content more comfortably.',
          },
          {
            id: 'US-10.02.02',
            text: 'As a user, I want text size preferences to be retained so that I do not need to configure them repeatedly.',
          },
        ],
      },
      {
        id: 'F-10.03',
        title: 'Audio Instructions',
        userStories: [
          {
            id: 'US-10.03.01',
            text: 'As a user, I want important instructions to be available through audio so that I can access information without depending on text.',
          },
          {
            id: 'US-10.03.02',
            text: 'As a user, I want audio instructions to be replayed when requested so that I can hear difficult instructions again.',
          },
        ],
      },
      {
        id: 'F-10.04',
        title: 'Alternative Input Methods',
        userStories: [
          {
            id: 'US-10.04.01',
            text: 'As a user, I want to interact with training activities using supported alternative input methods so that I can choose an appropriate interaction method.',
          },
          {
            id: 'US-10.04.02',
            text: 'As a user, I want the platform to support input methods appropriate to my accessibility needs so that I can complete training activities.',
          },
        ],
      },
      {
        id: 'F-10.05',
        title: 'Simplified Navigation',
        userStories: [
          {
            id: 'US-10.05.01',
            text: 'As a user, I want consistent navigation across the platform so that I can learn how to use the interface more easily.',
          },
          {
            id: 'US-10.05.02',
            text: 'As a user, I want to return to my active training session quickly so that I can resume training without unnecessary navigation.',
          },
          {
            id: 'US-10.05.03',
            text: 'As a user, I want important actions to require minimal navigation steps so that I can complete tasks efficiently.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 11
  ============================================================= */
  {
    id: 'EPIC-11',
    title: 'Security and Data Protection',
    features: [
      {
        id: 'F-11.01',
        title: 'Data Encryption',
        userStories: [
          {
            id: 'US-11.01.01',
            text: 'As a user, I want my confidential information to be encrypted during transmission so that it cannot be easily intercepted.',
          },
          {
            id: 'US-11.01.02',
            text: 'As a user, I want my confidential information to be encrypted while stored so that unauthorized access to stored data is limited.',
          },
        ],
      },
      {
        id: 'F-11.02',
        title: 'Secure Authentication',
        userStories: [
          {
            id: 'US-11.02.01',
            text: 'As a system administrator, I want authentication mechanisms to follow secure practices so that user accounts are protected.',
          },
          {
            id: 'US-11.02.02',
            text: 'As an administrator, I want repeated failed authentication attempts to be handled securely so that brute-force access attempts can be mitigated.',
          },
        ],
      },
      {
        id: 'F-11.03',
        title: 'Authorization and Access Control',
        userStories: [
          {
            id: 'US-11.03.01',
            text: 'As a system administrator, I want access permissions to be assigned according to user roles so that users can access only authorized functions.',
          },
          {
            id: 'US-11.03.02',
            text: 'As a user, I want protected data to be accessible only to authorized users so that my information remains private.',
          },
        ],
      },
      {
        id: 'F-11.04',
        title: 'Password Security',
        userStories: [
          {
            id: 'US-11.04.01',
            text: 'As a system administrator, I want user passwords to be stored securely so that passwords cannot be directly recovered from storage.',
          },
          {
            id: 'US-11.04.02',
            text: 'As a user, I want password requirements to be communicated clearly so that I can create a secure password.',
          },
        ],
      },
      {
        id: 'F-11.05',
        title: 'Session Security',
        userStories: [
          {
            id: 'US-11.05.01',
            text: 'As a user, I want inactive sessions to expire after a defined period so that unauthorized access is reduced.',
          },
          {
            id: 'US-11.05.02',
            text: 'As a user, I want to be able to sign out of my account so that my session can be terminated securely.',
          },
        ],
      },
      {
        id: 'F-11.06',
        title: 'Security Audit Logging',
        userStories: [
          {
            id: 'US-11.06.01',
            text: 'As a system administrator, I want important security events to be logged so that suspicious activity can be investigated.',
          },
          {
            id: 'US-11.06.02',
            text: 'As an administrator, I want audit records to include relevant timestamps and user information so that events can be traced.',
          },
        ],
      },
      {
        id: 'F-11.07',
        title: 'Sensitive Data Protection',
        userStories: [
          {
            id: 'US-11.07.01',
            text: 'As a system administrator, I want sensitive information to be handled according to its classification so that unnecessary exposure is minimized.',
          },
          {
            id: 'US-11.07.02',
            text: 'As a system administrator, I want sensitive information to be excluded from inappropriate logs so that confidential data is not accidentally exposed.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 12
  ============================================================= */
  {
    id: 'EPIC-12',
    title: 'Platform and System Availability',
    features: [
      {
        id: 'F-12.01',
        title: 'Web Platform Support',
        userStories: [
          {
            id: 'US-12.01.01',
            text: 'As a user, I want to access the platform through a web browser so that I can use the service without installing an application.',
          },
          {
            id: 'US-12.01.02',
            text: 'As a user, I want core training functionality to work on supported web browsers so that I can complete training online.',
          },
        ],
      },
      {
        id: 'F-12.02',
        title: 'Android Platform Support',
        userStories: [
          {
            id: 'US-12.02.01',
            text: 'As an Android user, I want to access the training platform from my device so that I can train using Android.',
          },
          {
            id: 'US-12.02.02',
            text: 'As an Android user, I want core voice and training functions to work on my device so that I can complete training.',
          },
        ],
      },
      {
        id: 'F-12.03',
        title: 'iOS Platform Support',
        userStories: [
          {
            id: 'US-12.03.01',
            text: 'As an iOS user, I want to access the training platform from my device so that I can train using iOS.',
          },
          {
            id: 'US-12.03.02',
            text: 'As an iOS user, I want core voice and training functions to work on my device so that I can complete training.',
          },
        ],
      },
      {
        id: 'F-12.04',
        title: 'Global Internet Accessibility',
        userStories: [
          {
            id: 'US-12.04.01',
            text: 'As a user, I want to access the platform from supported countries and networks so that geographic restrictions do not unnecessarily prevent access.',
          },
          {
            id: 'US-12.04.02',
            text: 'As a user, I want the platform to use globally accessible services so that I can access training while travelling.',
          },
        ],
      },
      {
        id: 'F-12.05',
        title: 'System Availability',
        userStories: [
          {
            id: 'US-12.05.01',
            text: 'As a user, I want the service to be available during the defined operating period so that I can access training when needed.',
          },
          {
            id: 'US-12.05.02',
            text: 'As an administrator, I want service availability to be monitored so that outages can be detected.',
          },
        ],
      },
      {
        id: 'F-12.06',
        title: 'Fault Recovery',
        userStories: [
          {
            id: 'US-12.06.01',
            text: 'As a user, I want my training progress to be preserved when a system failure occurs so that I do not lose completed work.',
          },
          {
            id: 'US-12.06.02',
            text: 'As a system administrator, I want failed services to recover according to defined recovery procedures so that disruption is minimized.',
          },
          {
            id: 'US-12.06.03',
            text: 'As an administrator, I want system failures to be logged so that recurring problems can be investigated.',
          },
        ],
      },
      {
        id: 'F-12.07',
        title: 'Cross-Platform Data Synchronization',
        userStories: [
          {
            id: 'US-12.07.01',
            text: 'As a user, I want my progress to remain synchronized across web, Android, and iOS so that I can switch devices without losing progress.',
          },
          {
            id: 'US-12.07.02',
            text: 'As a user, I want my scores and achievements to remain consistent across supported devices so that my account reflects one unified history.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 13
  ============================================================= */
  {
    id: 'EPIC-13',
    title: 'Performance and Scalability',
    features: [
      {
        id: 'F-13.01',
        title: 'Voice Interaction Latency',
        userStories: [
          {
            id: 'US-13.01.01',
            text: 'As a user, I want voice interactions to respond within the defined latency target so that the conversation feels responsive.',
          },
          {
            id: 'US-13.01.02',
            text: 'As an administrator, I want voice response latency to be monitored so that performance problems can be identified.',
          },
        ],
      },
      {
        id: 'F-13.02',
        title: 'API Response Performance',
        userStories: [
          {
            id: 'US-13.02.01',
            text: 'As a user, I want normal platform actions to respond within the defined performance target so that the application feels responsive.',
          },
          {
            id: 'US-13.02.02',
            text: 'As an administrator, I want API response times to be monitored so that slow services can be identified.',
          },
        ],
      },
      {
        id: 'F-13.03',
        title: 'Transaction Throughput',
        userStories: [
          {
            id: 'US-13.03.01',
            text: 'As a system administrator, I want the system to process the required number of transactions per second so that the platform can support expected demand.',
          },
          {
            id: 'US-13.03.02',
            text: 'As an administrator, I want transaction throughput to be monitored so that capacity limitations can be detected.',
          },
        ],
      },
      {
        id: 'F-13.04',
        title: 'Concurrent User Support',
        userStories: [
          {
            id: 'US-13.04.01',
            text: 'As a system administrator, I want the platform to support the expected number of concurrent users so that users can access training simultaneously.',
          },
          {
            id: 'US-13.04.02',
            text: 'As an administrator, I want concurrency limits and resource usage to be monitored so that capacity can be managed.',
          },
        ],
      },
      {
        id: 'F-13.05',
        title: 'Performance Monitoring',
        userStories: [
          {
            id: 'US-13.05.01',
            text: 'As a system administrator, I want application performance metrics to be collected so that performance trends can be analyzed.',
          },
          {
            id: 'US-13.05.02',
            text: 'As an administrator, I want alerts for abnormal performance so that issues can be investigated promptly.',
          },
        ],
      },
      {
        id: 'F-13.06',
        title: 'System Load Testing',
        userStories: [
          {
            id: 'US-13.06.01',
            text: 'As a system administrator, I want the platform to be load-tested against expected demand so that performance limitations can be identified before deployment.',
          },
          {
            id: 'US-13.06.02',
            text: 'As an administrator, I want load-test results to be recorded so that releases can be compared against performance targets.',
          },
        ],
      },
      {
        id: 'F-13.07',
        title: 'Scalability',
        userStories: [
          {
            id: 'US-13.07.01',
            text: 'As a system administrator, I want platform services to scale when demand increases so that performance remains within defined limits.',
          },
          {
            id: 'US-13.07.02',
            text: 'As an administrator, I want system resources to be monitored during scaling so that additional capacity can be provisioned when required.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 14
  ============================================================= */
  {
    id: 'EPIC-14',
    title: 'Healthcare and Regulatory Compliance',
    features: [
      {
        id: 'F-14.01',
        title: 'Patient Data Protection',
        userStories: [
          {
            id: 'US-14.01.01',
            text: 'As a healthcare-related user, I want patient-related data to be protected so that confidential information is not unnecessarily exposed.',
          },
          {
            id: 'US-14.01.02',
            text: 'As a system administrator, I want patient-related data to be processed according to applicable regulations so that the system meets its compliance obligations.',
          },
        ],
      },
      {
        id: 'F-14.02',
        title: 'Healthcare Data Access Control',
        userStories: [
          {
            id: 'US-14.02.01',
            text: 'As a system administrator, I want access to patient-related data to be restricted according to authorized roles so that sensitive information is protected.',
          },
          {
            id: 'US-14.02.02',
            text: 'As an authorized user, I want to access only the patient information necessary for my role so that unnecessary data exposure is avoided.',
          },
        ],
      },
      {
        id: 'F-14.03',
        title: 'Healthcare Data Audit Trail',
        userStories: [
          {
            id: 'US-14.03.01',
            text: 'As a system administrator, I want access to sensitive healthcare data to be logged so that access can be audited.',
          },
          {
            id: 'US-14.03.02',
            text: 'As a compliance administrator, I want audit records to contain sufficient information to investigate data access events.',
          },
        ],
      },
      {
        id: 'F-14.04',
        title: 'Data Retention Management',
        userStories: [
          {
            id: 'US-14.04.01',
            text: 'As a compliance administrator, I want data retention rules to be defined so that records are stored for the required period.',
          },
          {
            id: 'US-14.04.02',
            text: 'As a compliance administrator, I want records that reach their retention limit to be handled according to policy so that unnecessary data is not retained.',
          },
        ],
      },
      {
        id: 'F-14.05',
        title: 'Regulatory Compliance',
        userStories: [
          {
            id: 'US-14.05.01',
            text: 'As a system administrator, I want the platform\'s data-handling processes to follow applicable healthcare regulations so that compliance requirements can be met.',
          },
          {
            id: 'US-14.05.02',
            text: 'As a compliance administrator, I want compliance-related controls to be documented so that the system can be reviewed and audited.',
          },
        ],
      },
    ],
  },

  /* =============================================================
     EPIC 15
  ============================================================= */
  {
    id: 'EPIC-15',
    title: 'E-Commerce and Payment Integration',
    features: [
      {
        id: 'F-15.01',
        title: 'Payment Gateway Integration',
        userStories: [
          {
            id: 'US-15.01.01',
            text: 'As a user, I want the platform to support external payment gateways so that I can pay using supported online payment methods.',
          },
          {
            id: 'US-15.01.02',
            text: 'As an administrator, I want payment gateways to be configurable so that supported providers can be added or maintained.',
          },
        ],
      },
      {
        id: 'F-15.02',
        title: 'PayPal Integration',
        userStories: [
          {
            id: 'US-15.02.01',
            text: 'As a user, I want to pay using PayPal so that I can use my preferred payment method.',
          },
          {
            id: 'US-15.02.02',
            text: 'As an administrator, I want PayPal payment results to be returned to the platform so that transactions can be recorded correctly.',
          },
        ],
      },
      {
        id: 'F-15.03',
        title: 'Payment Transaction Verification',
        userStories: [
          {
            id: 'US-15.03.01',
            text: 'As a user, I want the system to verify payment completion before granting paid access so that access is not granted for unsuccessful payments.',
          },
          {
            id: 'US-15.03.02',
            text: 'As an administrator, I want external payment transaction identifiers to be recorded so that transactions can be reconciled.',
          },
        ],
      },
      {
        id: 'F-15.04',
        title: 'Payment Failure Handling',
        userStories: [
          {
            id: 'US-15.04.01',
            text: 'As a user, I want to be informed when my payment fails so that I know that my purchase was not completed.',
          },
          {
            id: 'US-15.04.02',
            text: 'As a user, I want to retry a failed payment so that I can complete my purchase.',
          },
          {
            id: 'US-15.04.03',
            text: 'As an administrator, I want failed transactions to be recorded so that payment problems can be investigated.',
          },
        ],
      },
      {
        id: 'F-15.05',
        title: 'Refund Handling',
        userStories: [
          {
            id: 'US-15.05.01',
            text: 'As a user, I want eligible payments to be refundable so that I can receive money back when a refund is approved.',
          },
          {
            id: 'US-15.05.02',
            text: 'As an administrator, I want to initiate a refund so that approved refund requests can be processed.',
          },
          {
            id: 'US-15.05.03',
            text: 'As a user, I want to see the status of my refund so that I know whether it has been processed.',
          },
        ],
      },
      {
        id: 'F-15.06',
        title: 'External Vendor Integration',
        userStories: [
          {
            id: 'US-15.06.01',
            text: 'As an administrator, I want the platform to communicate with external payment vendors through defined interfaces so that payment services can be integrated.',
          },
          {
            id: 'US-15.06.02',
            text: 'As an administrator, I want external service errors to be handled safely so that payment failures do not corrupt platform records.',
          },
          {
            id: 'US-15.06.03',
            text: 'As an administrator, I want external integration events to be logged so that integration issues can be investigated.',
          },
        ],
      },
    ],
  },
];

/* ===============================================================
   SCREEN
=============================================================== */

export default function RequirementsVersionScreen() {
  const { version } = useLocalSearchParams<{
    version: string;
  }>();

  const currentVersion =
    Array.isArray(version)
      ? version[0]
      : version ?? CURRENT_VERSION;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* =======================================================
            HEADER
        ======================================================= */}

        <View style={styles.header}>
          <ThemedText type="title">
            Software Requirements Specification
          </ThemedText>

          <ThemedText style={styles.description}>
            Functional, non-functional, domain, epic, feature,
            and user-story requirements for the project.
          </ThemedText>
        </View>

        {/* =======================================================
            VERSION SELECTOR
        ======================================================= */}

        <VersionSelector
          currentVersion={currentVersion}
          versions={VERSIONS}
        />

        {/* =======================================================
            DOCUMENT
        ======================================================= */}

        <View style={styles.document}>
          <View style={styles.versionHeader}>
            <ThemedText type="subtitle">
              Version {currentVersion}
            </ThemedText>

            <ThemedText style={styles.versionDescription}>
              Software Requirements Specification
            </ThemedText>
          </View>

          {/* =====================================================
              1. FUNCTIONAL REQUIREMENTS
          ===================================================== */}

          <DocumentSection
            number="1"
            title="Functional Requirements"
          >
            {FUNCTIONAL_REQUIREMENTS.map((requirement) => (
              <FunctionalRequirementCard
                key={requirement.id}
                requirement={requirement}
              />
            ))}
          </DocumentSection>

          {/* =====================================================
              2. NON-FUNCTIONAL REQUIREMENTS
          ===================================================== */}

          <DocumentSection
            number="2"
            title="Non-Functional Requirements"
          >
            {NON_FUNCTIONAL_REQUIREMENTS.map((category) => (
              <NonFunctionalCategoryCard
                key={category.title}
                category={category}
              />
            ))}
          </DocumentSection>

          {/* =====================================================
              3. DOMAIN REQUIREMENTS
          ===================================================== */}

          <DocumentSection
            number="3"
            title="Domain Requirements"
          >
            {DOMAIN_REQUIREMENTS.map((requirement) => (
              <DomainRequirementCard
                key={requirement.id}
                requirement={requirement}
              />
            ))}
          </DocumentSection>

          {/* =====================================================
              4. EPICS
          ===================================================== */}

          <DocumentSection
            number="4"
            title="Epics"
          >
            {EPICS.map((epic) => (
              <EpicCard
                key={epic.id}
                epic={epic}
              />
            ))}
          </DocumentSection>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

/* ===============================================================
   DOCUMENT SECTION
=============================================================== */

function DocumentSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.documentSection}>
      <ThemedText type="subtitle">
        {number}. {title}
      </ThemedText>

      <View style={styles.documentSectionContent}>
        {children}
      </View>
    </View>
  );
}

/* ===============================================================
   FUNCTIONAL REQUIREMENT
=============================================================== */

function FunctionalRequirementCard({
  requirement,
}: {
  requirement: FunctionalRequirement;
}) {
  return (
    <View style={styles.requirementCard}>
      <View style={styles.requirementHeader}>
        <ThemedText type="defaultSemiBold">
          {requirement.id}
        </ThemedText>

        <ThemedText type="defaultSemiBold">
          {requirement.title}
        </ThemedText>
      </View>

      <BulletList items={requirement.items} />
    </View>
  );
}

/* ===============================================================
   NON-FUNCTIONAL CATEGORY
=============================================================== */

function NonFunctionalCategoryCard({
  category,
}: {
  category: NonFunctionalCategory;
}) {
  return (
    <View style={styles.category}>
      <ThemedText type="defaultSemiBold">
        {category.title}
      </ThemedText>

      <View style={styles.categoryContent}>
        {category.items.map((item) => (
          <View
            key={item.id}
            style={styles.nfrItem}
          >
            <View style={styles.requirementHeader}>
              <ThemedText type="defaultSemiBold">
                {item.id}
              </ThemedText>

              <ThemedText type="defaultSemiBold">
                {item.title}
              </ThemedText>
            </View>

            <BulletList items={item.items} />
          </View>
        ))}
      </View>
    </View>
  );
}

/* ===============================================================
   DOMAIN REQUIREMENT
=============================================================== */

function DomainRequirementCard({
  requirement,
}: {
  requirement: DomainRequirement;
}) {
  return (
    <View style={styles.requirementCard}>
      <View style={styles.requirementHeader}>
        <ThemedText type="defaultSemiBold">
          {requirement.id}
        </ThemedText>

        <ThemedText type="defaultSemiBold">
          {requirement.title}
        </ThemedText>
      </View>

      <BulletList items={requirement.items} />
    </View>
  );
}

/* ===============================================================
   EPIC
=============================================================== */

function EpicCard({
  epic,
}: {
  epic: Epic;
}) {
  return (
    <View style={styles.epic}>
      <View style={styles.epicHeader}>
        <ThemedText type="defaultSemiBold">
          {epic.id}
        </ThemedText>

        <ThemedText
          type="defaultSemiBold"
          style={styles.epicTitle}
        >
          {epic.title}
        </ThemedText>
      </View>

      <View style={styles.features}>
        {epic.features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
          />
        ))}
      </View>
    </View>
  );
}

/* ===============================================================
   FEATURE
=============================================================== */

function FeatureCard({
  feature,
}: {
  feature: Feature;
}) {
  return (
    <View style={styles.feature}>
      <View style={styles.featureHeader}>
        <ThemedText type="defaultSemiBold">
          {feature.id}
        </ThemedText>

        <ThemedText type="defaultSemiBold">
          {feature.title}
        </ThemedText>
      </View>

      <View style={styles.userStories}>
        {feature.userStories.map((story) => (
          <UserStoryCard
            key={story.id}
            story={story}
          />
        ))}
      </View>
    </View>
  );
}

/* ===============================================================
   USER STORY
=============================================================== */

function UserStoryCard({
  story,
}: {
  story: UserStory;
}) {
  return (
    <View style={styles.userStory}>
      <View style={styles.userStoryId}>
        <ThemedText
          type="defaultSemiBold"
          style={styles.userStoryIdText}
        >
          {story.id}
        </ThemedText>
      </View>

      <ThemedText style={styles.userStoryText}>
        {story.text}
      </ThemedText>
    </View>
  );
}

/* ===============================================================
   BULLET LIST
=============================================================== */

function BulletList({
  items,
}: {
  items: string[];
}) {
  return (
    <View style={styles.bulletList}>
      {items.map((item, index) => (
        <View
          key={`${item}-${index}`}
          style={styles.bulletRow}
        >
          <ThemedText style={styles.bullet}>
            ¿
          </ThemedText>

          <ThemedText style={styles.body}>
            {item}
          </ThemedText>
        </View>
      ))}
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
    maxWidth: 1100,
    alignSelf: 'center',
    padding: 24,
    paddingBottom: 100,
  },

  header: {
    marginBottom: 28,
  },

  description: {
    marginTop: 10,
    opacity: 0.7,
    lineHeight: 24,
    maxWidth: 850,
  },

  document: {
    marginTop: 36,
  },

  versionHeader: {
    marginBottom: 10,
  },

  versionDescription: {
    marginTop: 6,
    opacity: 0.5,
  },

  /* -------------------------------------------------------------
     MAIN DOCUMENT SECTION
  ------------------------------------------------------------- */

  documentSection: {
    marginTop: 44,
  },

  documentSectionContent: {
    marginTop: 22,
  },

  /* -------------------------------------------------------------
     REQUIREMENT CARDS
  ------------------------------------------------------------- */

  requirementCard: {
    marginBottom: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#88888840',
    borderRadius: 12,
  },

  requirementHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
  },

  bulletList: {
    marginTop: 14,
    gap: 8,
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  bullet: {
    width: 20,
    lineHeight: 24,
    opacity: 0.75,
  },

  body: {
    flex: 1,
    lineHeight: 24,
    opacity: 0.85,
  },

  /* -------------------------------------------------------------
     NON-FUNCTIONAL CATEGORIES
  ------------------------------------------------------------- */

  category: {
    marginBottom: 30,
  },

  categoryContent: {
    marginTop: 16,
  },

  nfrItem: {
    marginBottom: 22,
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#88888830',
  },

  /* -------------------------------------------------------------
     EPICS
  ------------------------------------------------------------- */

  epic: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#88888840',
    borderRadius: 14,
    padding: 20,
  },

  epicHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#88888830',
  },

  epicTitle: {
    marginTop: 4,
    fontSize: 18,
  },

  features: {
    marginTop: 18,
    gap: 22,
  },

  /* -------------------------------------------------------------
     FEATURES
  ------------------------------------------------------------- */

  feature: {
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#88888830',
  },

  featureHeader: {
    gap: 4,
    marginBottom: 14,
  },

  /* -------------------------------------------------------------
     USER STORIES
  ------------------------------------------------------------- */

  userStories: {
    gap: 12,
  },

  userStory: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#88888830',
  },

  userStoryId: {
    marginBottom: 5,
  },

  userStoryIdText: {
    fontSize: 13,
  },

  userStoryText: {
    lineHeight: 23,
    opacity: 0.85,
  },
});
