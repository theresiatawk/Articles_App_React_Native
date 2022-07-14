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
  TextInput,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as articleActions from "../../store/actions/articles";
import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import * as authActions from '../../store/actions/auth';
import { FontAwesome } from '@expo/vector-icons';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/CustomHeaderButton";

const ArticlesScreen = (props) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(0);
 
  const articles = useSelector((state) => state.articles.availableArticles);
  const searchText = useSelector((state) => state.articles.searchedText);

  const dispatch = useDispatch();
  const logout = () => {};
  const loadArticles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try { 
      await dispatch(articleActions.fetchArticles(currentPage, searchText));
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
  return (
    <View style={styles.pageContainer}>
      <Text style = {styles.page}>Page {currentPage + 1}</Text>
      <View style={styles.searchBarContainer}>
        <TextInput 
          style = {styles.textInputSearch} 
          placeholder="Search..." 
          onChangeText={event => {
            dispatch(articleActions.searchArticles(event));
            dispatch(articleActions.fetchSpecificArticles(searchText));
            }}></TextInput>
        <TouchableOpacity
          style = {styles.textSearchButton}
          onPress={() => {
            dispatch(articleActions.fetchArticles(currentPage, searchText));
          }}
        >
        <FontAwesome 
        name="search" 
        size={16} color="#888" 
        />
        </TouchableOpacity>
      </View>
    {}
    {articles.length !== 0 ? <FlatList
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
          </View>
          <View style={styles.additionalDetails}>
              <Text style = {styles.abstract}><Text style = {styles.bold}> Publisher: </Text>{itemData.item.publisher}</Text>
              <Text style = {styles.abstract}><Text style = {styles.bold}>Source: </Text>{itemData.item.source}</Text>
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
    /> : <View style={styles.centered}>
    <Text>No Articles found.</Text>
  </View>}
    </View>
  );
  
};

ArticlesScreen.navigationOptions = (navData) => {
  return {
    headerRight: props => {
      const dispatch = useDispatch();
    return (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title = 'Logout'
        iconName = 'logout'
        onPress={() => {
        dispatch(authActions.logout());
        navData.navigation.navigate('Authentication');
        }}/>
    </HeaderButtons>);
    }
  }
}
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
  },
  pageContainer: {
    alignItems: "center",
    paddingTop: 5,
  },
  page: {
    fontSize: 14,
    color: Colors.primary
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    width: Dimensions.get('window').width - 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 2,
    marginVertical: 10,
    borderColor: 'lightgray',
    margin: 20
  },
  textInputSearch: {
    flex: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    height: 40,
    paddingLeft: 10
  },
  textSearchButton: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 40
  },

  article: {
    flex: 1,
    height: 550,
    margin: 20,
  },
  imageContainer: {
    width: "100%",
    height: "40%",
    borderRadius: 1000,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    overflow:'hidden'
  },
  details: {
    alignItems: "center",
    height: "60%",
    padding: 10,
  },
  additionalDetails: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
    height: "40%",
    padding:5
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
    fontSize: 12,
    color: "#888",
    height: "30%", 
  },
  loader: {
    marginTop: 20, 
    alignItems: "center",
  }
});
export default ArticlesScreen;