import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
