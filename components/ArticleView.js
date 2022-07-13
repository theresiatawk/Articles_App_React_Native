import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from './Card';

const ArticleView = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.article}>
      <View style={styles.touchable}>
        <TouchableCmp useForeground>
          {/* <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View> */}
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.abstract}>{props.abstract}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          {/* </View> */}
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  article: {
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 2
  },
  abstract: {
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ArticleView;
