import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ListView,
  Image,
} from 'react-native';
import axios from 'axios';
import Styles from './src/components/Styles';
import Lists from './src/components/Lists';
import Sort from './src/helpers/Sort';
import { List, ListItem, Card } from 'react-native-elements';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import SvgUri from 'react-native-svg-uri';

const logo_img = require('./src/assets/img/logo.svg');
const BASE_URL = 'https://sukinema.herokuapp.com/api/v1/movies';
// const BASE_URL = 'http://localhost:8080/api/v1/movies';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [dispMovies, setDispMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [latlong, setLatlong] = useState({ latitude: 0.0, longitude: 0.0 });
  const [url, setUrl] = useState(BASE_URL);
  const [isLocation, setIsLocation] = useState(false);
  const [sortID, setSortID] = useState('time');

  const getLocationAsync = async () => {
    setIsLoaded(!isLoaded);
    setIsLocation(!isLocation);
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        message: '位置情報のパーミッションの取得に失敗しました。',
      });
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setLatlong({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setUrl(BASE_URL + `/pref/8`);
    setIsLoaded(!isLoaded);
    setIsLocation(!isLocation);
  };

  useEffect(() => {
    setIsLoaded(!isLoaded);
    let retMovies = [];
    const f = async () => {
      await axios
        .get(url)
        .then((results) => {
          retMovies.push(results.data);
        })
        .catch((e) => {
          console.log(e);
        });
      const data = await retMovies[0];
      const valuedMovies = Sort(data, sortID, latlong);
      setMovies(data);
      setDispMovies(valuedMovies);
      setIsLoaded(!isLoaded);
    };
    f();
  }, [url, latlong]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const test = (e) => {
    console.log(e);
    alert(e);
  };

  const renderItem = (item) => {
    const drop_path = item.item.drop_path;
    const is_link = String(drop_path).includes('http');
    const imgSource = is_link ? { uri: drop_path } : drop_path;
    return (
      <TouchableOpacity onPress={test}>
        <Card style={Styles.cards} borderRadius={10}>
          <Image source={imgSource} style={Styles.card} />
          <View style={Styles.content}>
            <View style={Styles.left_text}>
              <Text>上映まで</Text>
              <Text>{item.item.diff_time}分</Text>
            </View>
          </View>
          <Text key={item.index}>{item.item.title}</Text>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <SafeAreaView>
        <View>
          <SvgUri source={logo_img} />
        </View>
        {(() => {
          if (!isLoaded && !isLocation) {
            return <Text>Loading...</Text>;
          } else {
            return (
              <View style={Styles.main}>
                <FlatList
                  data={dispMovies}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                />
              </View>
            );
          }
        })()}
      </SafeAreaView>
    </React.Fragment>
  );
};

export default App;
