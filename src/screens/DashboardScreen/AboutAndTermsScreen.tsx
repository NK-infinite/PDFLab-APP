import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Linking, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useTheme } from '../../utils/themeManager';

const AboutAndTermsScreen = () => {
  const { theme } = useTheme();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
        {title}
      </Text>
      <Text style={[styles.sectionText, { color: theme.textSecondary }]}>
        {children}
      </Text>
    </View>
  );

  const FeatureItem = ({ text }: { text: string }) => (
    <View style={styles.featureItem}>
      <Icon 
        name="check-circle" 
        size={16} 
        color={theme.sectionTitle} 
        style={styles.featureIcon}
      />
      <Text style={[styles.featureText, { color: theme.textSecondary }]}>
        {text}
      </Text>
    </View>
  );

  const openEmail = () => {
    Linking.openURL('mailto:nikhilkeshvala1@gmail.com?subject=Offline%20PDF%20Tools%20Support');
  };

  const openPrivacyPolicy = () => {
    Linking.openURL('https://offlinepdftools.com/privacy');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== BRAND HEADER ===== */}
        <View style={styles.brandHeader}>
          <View style={[styles.logoContainer, { backgroundColor: theme.textPrimary }]}>
            <Icon name="file-pdf" size={46} color={theme.background} />
          </View>
          
          <Text style={[styles.appName, { color: theme.textPrimary }]}>
            PDFLAb
          </Text>
          
          <Text style={[styles.appTagline, { color: theme.textSecondary }]}>
            Secure • Private • Offline
          </Text>
        </View>

        {/* ===== ABOUT SECTIONS ===== */}
        <Section title="📱 About the App">
         PDFLab is a privacy-first document utility designed to perform all PDF operations directly on your device. The app does not upload, store, or analyze your documents on any external servers, ensuring complete data confidentiality and ownership.
        </Section>

        <Section title="🔒 What Makes It Different">
          All features including merge, split, compression, watermarking, and document protection run entirely offline. This guarantees faster processing, zero internet dependency, and maximum privacy for your files.
        </Section>

        {/* ===== FEATURES ===== */}
        <View style={styles.featureSection}>
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            ⚡ Core Capabilities
          </Text>
          <View style={styles.featureList}>
            <FeatureItem text="Fully offline PDF processing" />
            <FeatureItem text="No cloud uploads or tracking" />
            <FeatureItem text="Professional-grade PDF utilities" />
            <FeatureItem text="Optimized for performance & storage" />
            <FeatureItem text="Designed with security at its core" />
          </View>
        </View>

        {/* ===== TERMS & CONDITIONS ===== */}
        <Section title="📜 Terms & Conditions">
          By installing or using this application, you agree to comply with the following terms and conditions.
        </Section>

        <View style={styles.termsContainer}>
          <Text style={[styles.termNumber, { color: theme.sectionTitle }]}>1.</Text>
          <View style={styles.termContent}>
            <Text style={[styles.termTitle, { color: theme.textPrimary }]}>
              Offline Usage & Privacy
            </Text>
            <Text style={[styles.termText, { color: theme.textSecondary }]}>
              All document operations are executed locally on your device. The application does not collect, transmit, or store any personal or document-related data.
            </Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={[styles.termNumber, { color: theme.sectionTitle }]}>2.</Text>
          <View style={styles.termContent}>
            <Text style={[styles.termTitle, { color: theme.textPrimary }]}>
              User Responsibility
            </Text>
            <Text style={[styles.termText, { color: theme.textSecondary }]}>
              You are solely responsible for the documents you process. The developers shall not be held liable for any loss, corruption, or misuse of files.
            </Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={[styles.termNumber, { color: theme.sectionTitle }]}>3.</Text>
          <View style={styles.termContent}>
            <Text style={[styles.termTitle, { color: theme.textPrimary }]}>
              Intellectual Property
            </Text>
            <Text style={[styles.termText, { color: theme.textSecondary }]}>
              The application, including its design and source code, is protected under applicable copyright and intellectual property laws. Unauthorized redistribution is strictly prohibited.
            </Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={[styles.termNumber, { color: theme.sectionTitle }]}>4.</Text>
          <View style={styles.termContent}>
            <Text style={[styles.termTitle, { color: theme.textPrimary }]}>
              Limitation of Liability
            </Text>
            <Text style={[styles.termText, { color: theme.textSecondary }]}>
              This application is provided "as is" without warranties of any kind. The developers are not liable for any damages resulting from the use of this app.
            </Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={[styles.termNumber, { color: theme.sectionTitle }]}>5.</Text>
          <View style={styles.termContent}>
            <Text style={[styles.termTitle, { color: theme.textPrimary }]}>
              Updates & Changes
            </Text>
            <Text style={[styles.termText, { color: theme.textSecondary }]}>
              These terms may be updated periodically. Continued use of the application constitutes acceptance of the revised terms.
            </Text>
          </View>
        </View>

        {/* ===== CONTACT & LINKS ===== */}
        <View style={styles.contactSection}>
          <Text style={[styles.contactTitle, { color: theme.textPrimary }]}>
            📞 Contact & Support
          </Text>
          
          <TouchableOpacity 
            style={[styles.contactButton, { backgroundColor: theme.fileCardBg }]}
            onPress={openEmail}
          >
            <Icon name="envelope" size={18} color={theme.sectionTitle} />
            <Text style={[styles.contactButtonText, { color: theme.textPrimary }]}>
              nikhilkeshvala1@gmail.com
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={openPrivacyPolicy}
          >
            <Text style={[styles.linkText, { color: theme.sectionTitle }]}>
              View Privacy Policy
            </Text>
            <Icon name="arrow-up-right-from-square" size={14} color={theme.sectionTitle} />
          </TouchableOpacity>
        </View>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <View style={styles.versionBadge}>
            <Icon name="code-branch" size={12} color={theme.textSecondary} />
            <Text style={[styles.versionText, { color: theme.textSecondary }]}>
              Version 1.0.0
            </Text>
          </View>
          
          <Text style={[styles.copyrightText, { color: theme.textSecondary }]}>
            © 2025 Offline PDF Tools
          </Text>
          
          <Text style={[styles.rightsText, { color: theme.textSecondary }]}>
            All rights reserved
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 10,
  },
  logoContainer: {
    width: 90,
    height: 90,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  appTagline: {
    fontSize: 14,
    letterSpacing: 1.2,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  featureSection: {
    marginBottom: 28,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 4,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    marginBottom: 22,
    backgroundColor: 'transparent',
  },
  termNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 12,
    minWidth: 24,
  },
  termContent: {
    flex: 1,
  },
  termTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  termText: {
    fontSize: 14.5,
    lineHeight: 22,
  },
  contactSection: {
    marginTop: 10,
    marginBottom: 30,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 8,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.2)',
  },
  versionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  copyrightText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  rightsText: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default AboutAndTermsScreen;