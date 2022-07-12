import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as articleActions from "../../store/actions/articles";

const ArticlesScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(articleActions.fetchArticles());
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <Text>Articles Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ArticlesScreen;
