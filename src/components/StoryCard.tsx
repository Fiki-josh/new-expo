import React from "react";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet, Linking } from "react-native";
import moment from "moment";
import { StoryCardProps } from "../types";

export default function StoryCard({
  title,
  by,
  score,
  time,
  kids,
  url,
}: StoryCardProps) {
  const { colors } = useTheme();

  const openStoryUrl = async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <Card style={styles.card} onPress={openStoryUrl}>
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.author}>By {by}</Paragraph>
        <Paragraph style={styles.time}>{moment.unix(time).fromNow()}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="star" size={20} iconColor={colors.primary} />
        <Paragraph>{score} points</Paragraph>
        <View style={styles.spacer} />
        <IconButton
          icon="comment-outline"
          size={20}
          iconColor={colors.primary}
        />
        <Paragraph>{kids?.length ? kids.length : "0"} comments</Paragraph>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  author: {
    color: "gray",
    fontStyle: "italic",
  },
  time: {
    color: "gray",
  },
  spacer: {
    flex: 1,
  },
});
