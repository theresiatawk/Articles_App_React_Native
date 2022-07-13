import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Button,
  Image,
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
            {itemData.item.imageUrl !== '' && <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: itemData.item.imageUrl }} />
            </View>
          }
          <View style={styles.details}>
            <Text style={styles.section}>{itemData.item.section ? itemData.item.section : "General"}</Text>
            <Text style={styles.abstract} numberOfLines = {18}><Text style = {styles.bold}>Abstract: </Text>{itemData.item.abstract}</Text>
            {/* <Text style={styles.abstract}><Text style = {styles.bold}>Paragraph: </Text>{itemData.item.paragraph}</Text> */}
          </View>
          <View style={styles.generalDetails}>
            <Text><Text style = {styles.bold}>Publisher: </Text>{itemData.item.publisher}</Text>
            <Text><Text style = {styles.bold}>Source: </Text>{itemData.item.source}</Text>
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
    flex: 1,
    height: 400,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    overflow:'hidden'
  },
  details: {
    alignItems: "center",
    height: "40%",
    padding: 10,
  },
  section: {
    fontSize: 18,
    marginVertical: 2,
    color: Colors.primary
  },
  bold: {
    fontSize: 15,
    color: 'black'
  }, 
  abstract: {
    flexWrap: 'wrap',
    fontSize: 12,
    color: "#888",
    height: "30%", 
    margin: 15
  },
  generalDetails: {
    fontSize: 12,
    color: "black",
    height: "50%", 
    margin: 15
  },
  loader: {
    marginTop: 20, 
    alignItems: "center",
  }
});
export default ArticlesScreen;