
import { Image, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function TLDScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title">Top Level Design</ThemedText>

          <ThemedText style={styles.description}>
            High-level architecture and system structure.
          </ThemedText>
        </View>

        <Section number="1" title="System Overview">
          <ThemedText style={styles.body}>
            The system is a cross-platform training platform designed for web,
            Android, and iOS[cite: 2]. It facilitates user authentication,
            subscription management, and training module execution[cite: 2]. The
            platform specifically incorporates an aphasia-friendly interface
            with voice-based interaction and assessment capabilities[cite: 2].
            It is built to comply with both healthcare data protection
            regulations for patient data and standard e-commerce payment
            processing requirements[cite: 2].
          </ThemedText>
        </Section>

        <Section number="2" title="System Architecture">
          <Image
            source={require("../../assets/doc-asset/TLD-MDATE.png")}
            style={styles.architectureImage}
            resizeMode="contain"
          />
          <ThemedText style={styles.body}>
            The architecture utilizes a client-server model where client-side
            applications communicate with a centralized Host-Machine[cite: 1].
            External traffic is routed through a DNS and CDN, utilizing a Tunnel
            to securely reach a Proxy Server (NGINX) on the Host-Machine[cite:
            1]. The Proxy Server acts as an intermediary, directing requests to
            the Server-side application, which in turn orchestrates data between
            an external Inference Server, a Cache, and a multi-paradigm Database
            layer[cite: 1].
          </ThemedText>
        </Section>

        <Section number="3" title="System Components">
          <ThemedText style={styles.body}>
            ¿ Client-Side: Cross-platform user interfaces supporting text and
            speech capture[cite: 1, 2].{"\n"}¿ Proxy Server: NGINX instance
            handling incoming traffic and routing[cite: 1].{"\n"}¿ Server-Side:
            Core application backend managing business logic, scoring, and
            APIs[cite: 1].{"\n"}¿ Cache: Redis instance for high-speed data
            access[cite: 1].{"\n"}¿ Database: A storage tier consisting of
            Object Storage, SQL (PostgreSQL), and NoSQL (MongoDB)
            components[cite: 1].{"\n"}¿ Inference Server: An external
            GPU-enabled server dedicated to processing intensive tasks like
            speech-to-text and voice-based assessments[cite: 1, 2].
          </ThemedText>
        </Section>

        <Section number="4" title="Deployment Architecture">
          <ThemedText style={styles.body}>
            The backend infrastructure is hosted on a single Host-Machine[cite:
            1]. The core routing, server-side processing, caching, and database
            components are containerized and orchestrated temporarily using
            Docker Compose[cite: 1]. A DDNS service (DuckDNS) is also deployed
            on the Host-Machine to maintain domain name resolution[cite: 1].
          </ThemedText>
        </Section>

        <Section number="5" title="Network Architecture">
          <ThemedText style={styles.body}>
            Public traffic reaches the system via DNS and a CDN[cite: 1]. A
            secure Tunnel connects the external network to the
            Host-Machine[cite: 1]. Once inside the Host-Machine, the NGINX Proxy
            Server handles internal routing to the Server-side and DDNS
            components[cite: 1]. Developers possess direct network access paths
            to both the DNS layer and the internal Host-Machine[cite: 1].
          </ThemedText>
        </Section>

        <Section number="6" title="Data Flow">
          <ThemedText style={styles.body}>
            Client inputs, such as voice recordings or payment data, travel
            through the DNS/CDN and Tunnel to the NGINX Proxy[cite: 1, 2]. The
            Proxy forwards this payload to the Server-side application[cite: 1].
            For AI or speech evaluations, the Server-side sends data to the
            Inference Server and awaits the processed result[cite: 1, 2]. The
            Server-side queries the Redis Cache for rapid state retrieval, and
            reads/writes persistent records (like user progress, audit logs, and
            transaction history) to the SQL, NoSQL, or Object Storage
            databases[cite: 1, 2]. Responses flow back out through the proxy to
            the client[cite: 1].
          </ThemedText>
        </Section>

        <Section number="7" title="Technology Stack">
          <ThemedText style={styles.body}>
            ¿ Frontend: Cross-platform mobile and web application[cite: 2].
            {"\n"}¿ Gateway & Routing: NGINX, Cloudflare Tunnel, DuckDNS[cite:
            1].{"\n"}¿ Backend Runtime: Server-side application framework
            (Express)[cite: 1].{"\n"}¿ Databases: PostgreSQL (SQL), MongoDB
            (NoSQL), MinIO/S3 (Object Storage)[cite: 1].{"\n"}¿ Caching:
            Redis[cite: 1].{"\n"}¿ Infrastructure: Docker Compose[cite: 1].
            <ul>
              <li>
                <strong>Custom PC</strong>
                <ul>
                  <li>
                    <strong>OS:</strong> Windows 7
                  </li>
                  <li>
                    <strong>Processor:</strong> Intel Core i5
                  </li>
                  <li>
                    <strong>RAM:</strong> 16 GB
                  </li>
                  <li>
                    <strong>Storage:</strong> 512 GB
                  </li>
                </ul>
              </li>
              <li>
                <strong>Samsung Galaxy Tab A8</strong>
                <ul>
                  <li>
                    <strong>OS:</strong> Android 14
                  </li>
                  <li>
                    <strong>Processor:</strong> Octa-Core (2.0 GHz)
                  </li>
                  <li>
                    <strong>RAM:</strong> 4 GB (+ 4 GB vRAM)
                  </li>
                  <li>
                    <strong>Storage:</strong> 64 GB Internal (+ 128 GB SD Card)
                  </li>
                  <li>
                    <strong>Environment:</strong> Termux 0.119.0-beta.3
                    (aarch64)
                  </li>
                </ul>
              </li>
            </ul>
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

      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    maxWidth: 1000,
    alignSelf: "center",
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
  architectureImage: {
    width: "100%",
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});

