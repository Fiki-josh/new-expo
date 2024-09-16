import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Card,
  Avatar,
  Title,
  Paragraph,
  Chip,
  useTheme,
} from "react-native-paper";

export default function AboutMe() {
  const { colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <Card style={styles.profileCard}>
        <Card.Title
          title="Stutorpal Co-Founder"
          subtitle="Software Developer | UI/UX Designer"
          left={(props) => (
            <Avatar.Icon
              {...props}
              icon="account"
              style={{ backgroundColor: colors.primary }}
            />
          )}
        />
        <Card.Content>
          <Title style={styles.name}>Mayomikun Fiki</Title>
          <Paragraph style={styles.bio}>
            I have a strong proficiency in HTML, CSS, JavaScript, React,
            Next.js, and State Management. I am also experienced with
            server-side technologies like Node.js and Express.
          </Paragraph>
        </Card.Content>
      </Card>

      {/* Skills Section */}
      <View style={styles.skillsContainer}>
        <Title style={styles.skillsTitle}>Skills</Title>
        <View style={styles.chipContainer}>
          <Chip icon="code-tags" style={styles.chip}>
            HTML
          </Chip>
          <Chip icon="code-tags" style={styles.chip}>
            CSS
          </Chip>
          <Chip icon="code-braces" style={styles.chip}>
            JavaScript
          </Chip>
          <Chip icon="react" style={styles.chip}>
            React
          </Chip>
          <Chip icon="react" style={styles.chip}>
            React Native
          </Chip>
          <Chip icon="nodejs" style={styles.chip}>
            Node.js
          </Chip>
          <Chip icon="alpha-s-circle" style={styles.chip}>
            State Management
          </Chip>
          <Chip icon="server" style={styles.chip}>
            Express
          </Chip>
          <Chip icon="database" style={styles.chip}>
            SQL
          </Chip>
          <Chip icon="database" style={styles.chip}>
            NoSQL
          </Chip>
          <Chip icon="check-circle-outline" style={styles.chip}>
            Unit Testing
          </Chip>
          <Chip icon="check-circle-outline" style={styles.chip}>
            Integration Testing
          </Chip>
        </View>
      </View>

      {/* Passion Section */}
      <Card style={styles.passionCard}>
        <Card.Content>
          <Title style={styles.passionTitle}>My Passion</Title>
          <Paragraph style={styles.passionText}>
            My passion lies in developing solutions to complex problems and I
            take pride in writing efficient algorithms that enhance performance
            and user experience.
          </Paragraph>
          <Paragraph style={styles.passionText}>
            I am excited about the opportunity to bring my skills and enthusiasm
            to help create innovative and impactful software applications.
          </Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  profileCard: {
    marginBottom: 20,
    elevation: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  bio: {
    marginTop: 10,
    color: "gray",
  },
  skillsContainer: {
    marginVertical: 20,
  },
  skillsTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 4,
    backgroundColor: "#e0f7fa",
  },
  passionCard: {
    elevation: 4,
    paddingVertical: 10,
  },
  passionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  passionText: {
    fontSize: 16,
    color: "gray",
    lineHeight: 24,
  },
});
