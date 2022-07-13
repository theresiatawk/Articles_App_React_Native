import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as articleActions from "../../store/actions/articles";
import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import ArticleView from "../../components/ArticleView";
import * as authActions from '../../store/actions/auth';

const ArticlesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const articles = useSelector((state) => state.articles.availableArticles);
  const dispatch = useDispatch();

  const loadArticles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try { 
      await dispatch(articleActions.fetchArticles(currentPage));
    } catch (error) {
      setError(error.message);
    }  
    setIsRefreshing(false); 
    }, [dispatch, setIsLoading, setError, currentPage]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadArticles
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadArticles]);

  useEffect(() => {
    setIsLoading(true);
    loadArticles().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadArticles, currentPage]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error Occured</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && articles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Articles found.</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1}}>
      <Button
        title="Logout"
        color={Colors.primary}
        onPress={() => {
        dispatch(authActions.logout());
        props.navigation.navigate('Authentication');
        }}
      />
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <Card style={styles.article}>
          <View style={styles.details}>
            <Text style={styles.title}>Hello</Text>
            <Text style={styles.abstract}>{itemData.item.abstract}</Text>
          </View>
        </Card>
      )}
      ListFooterComponent={() => {
        return (
          isLoading ? 
        <View style = {styles.loader}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View> : null
        );
      }}
      onEndReached = {() => {
        if(currentPage === 0){
          setIsRefreshing(true);
          setCurrentPage(1);
        }
      }}
      onEndReachedThreshold={0.5}
      onRefresh={() => {
        if(currentPage === 1){
          setIsRefreshing(true);
          setCurrentPage(0);
        }
      }}
      refreshing={isLoading}
    />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  article: {
    height: 300,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
  },
  abstract: {
    fontSize: 14,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 20, 
    alignItems: "center",
  }
});
export default ArticlesScreen;