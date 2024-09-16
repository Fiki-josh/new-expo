import StoryCard from "@/src/components/StoryCard";
import { useGetNewStories } from "@/src/hooks/useGetNewStories";
import { RootState } from "@/src/redux/store";
import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { Text, useTheme, Button } from "react-native-paper";
import { useSelector } from "react-redux";

export default function NewStories() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { colors } = useTheme();

  const newStories = useSelector((state: RootState) => state.story.newStories);

  const {
    isError,
    errMsg,
    getMoreStories,
    getStories,
    canFetchNextPage,
  } = useGetNewStories(); //Hook Fetch Logic

  useEffect(() => {
    (async () => {
      await getStories();
      setLoading(false);
    })();
  }, []);

  const renderStory = ({ item }: { item: any }) => (
    <StoryCard
      id={item.id}
      title={item.title}
      by={item.by}
      score={item.score}
      time={item.time}
      kids={item.kids}
      url={item.url}
    />
  );

  if (loading && page === 1) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (errMsg && page === 1) {
    return (
      <View style={styles.container}>
        <Text style={{ color: colors.error }}>{errMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={newStories}
        renderItem={renderStory}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : isError ? (
            <Text style={{ color: colors.error }}>{errMsg}</Text>
          ) : canFetchNextPage ? (
            <Button
              mode="contained"
              onPress={async () => {
                setLoading(true);
                await getMoreStories();
                setLoading(false);
              }}
              style={styles.button}
            >
              Load More
            </Button>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    width: 200,
    marginHorizontal: "auto",
  },
});
