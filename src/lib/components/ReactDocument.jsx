// src/components/ResumeDocument.js
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#f7f7f7',
  },
  section: {
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 1px 5px rgba(0,0,0,0.1)',
  },
  header: {
    fontSize: 32,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#2c3e50',
    borderBottom: '2px solid #2980b9',
    paddingBottom: 10,
  },
  subheader: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2980b9',
    borderBottom: '1px solid #ecf0f1',
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#34495e',
  },
  listItem: {
    marginBottom: 15,
  },
  contactContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skill: {
    backgroundColor: '#2980b9',
    color: '#ffffff',
    borderRadius: 15,
    padding: 5,
    margin: 3,
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
    color: '#7f8c8d',
  },
});

const ResumeDocument = ({ data }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.section}>
        {/* Optional Logo */}
        {data.logo && <Image style={styles.logo} src={data.logo} />}
        <Text style={styles.header}>{data.fullName}</Text>
        <View style={styles.contactContainer}>
          <Text style={styles.text}>{data.email}</Text>
          <Text style={styles.text}>{data.phone}</Text>
          <Text style={styles.text}>{data.linkedinURL}</Text>
        </View>
        <Text style={styles.text}>{data.summary}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subheader}>Experience</Text>
        {data.experiences.map((experience, index) => (
          <View key={index} style={styles.listItem}>
            <Text style={{ fontWeight: 'bold', color: '#2980b9' }}>
              {experience.jobTitle} at {experience.company}
            </Text>
            <Text style={styles.text}>{experience.description}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.subheader}>Skills</Text>
        <View style={styles.skillsContainer}>
          {data.skills.map((skill, index) => (
            <Text key={index} style={styles.skill}>{skill.name}</Text>
          ))}
        </View>
      </View>
      <Text style={styles.footer}>
        © {new Date().getFullYear()} {data.fullName}. All rights reserved.
      </Text>
    </Page>
  </Document>
);

export default ResumeDocument;
