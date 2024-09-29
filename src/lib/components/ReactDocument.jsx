import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  section: {
    margin: '0 0 10px 0',
  },
  header: {
    fontSize: 24,
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 14,
    marginBottom: 5,
    color: '#34495e',
    borderBottom: '1px solid #bdc3c7',
    paddingBottom: 2,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#2c3e50',
  },
  bold: {
    fontWeight: 'bold',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottom: '1px solid #bdc3c7',
    paddingBottom: 5,
  },
  contactItem: {
    fontSize: 10,
    color: '#7f8c8d',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skill: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    padding: '2px 5px',
    margin: '0 3px 3px 0',
    fontSize: 9,
    color: '#2c3e50',
  },
  item: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  itemSubtitle: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#34495e',
  },
  dateRange: {
    fontSize: 9,
    color: '#7f8c8d',
  },
  bullet: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#7f8c8d',
    margin: '6px 5px 0 0',
  },
  bulletText: {
    flex: 1,
  },
});

const BulletItem = ({ children }) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
    <View style={styles.bullet} />
    <Text style={[styles.text, styles.bulletText]}>{children}</Text>
  </View>
);

const ResumeDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{data.fullName}</Text>
        <View style={styles.contactContainer}>
          <Text style={styles.contactItem}>{data.email}</Text>
          <Text style={styles.contactItem}>{data.phone}</Text>
          <Text style={styles.contactItem}>{data.linkedinURL}</Text>
        </View>
        <Text style={styles.text}>{data.summary}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Professional Experience</Text>
        {data.experiences.map((experience, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <View>
                <Text style={styles.itemTitle}>{experience.company}</Text>
                <Text style={styles.itemSubtitle}>{experience.jobTitle}</Text>
              </View>
            </View>
            {experience.description &&
            <BulletItem>{experience.description}</BulletItem>
          }
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Education</Text>
        {data.education.map((edu, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{edu.institution}</Text>
              <Text style={styles.itemSubtitle}>{edu.degree}</Text>
            </View>
            {edu.description &&
            <BulletItem>{edu.description}</BulletItem>
          }
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Projects</Text>
        {data.projects.map((project, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>{project.title}</Text>
            {project.description &&
            <BulletItem>{project.description}</BulletItem>
          }
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subheader}>Certifications</Text>
        {data.certifications.map((cert, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemTitle}>{cert.name}</Text>
            <Text style={styles.itemSubtitle}>{cert.authority}</Text>
            {cert.description &&
            <BulletItem>{cert.description}</BulletItem>
          }
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
    </Page>
  </Document>
);

export default ResumeDocument;