import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const BASE_URL = 'https://sukinema.herokuapp.com/api/v1/movies';
const App = () => {
  const [movies, setMovies] = useState([]);
  const [url, setUrl] = useState(BASE_URL);
  const [latlong, setLatlong] = useState({ latitude: 0.0, longitude: 0.0 });

  const getLocationAsync = async () => {
    console.log('現在位置取得中');
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        message: '位置情報のパーミッションの取得に失敗しました。',
      });
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLatlong({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setUrl(BASE_URL + `/pref/8`);
  };

  useEffect(() => {
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
      setMovies(data);
    };
    f();
  }, [url]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View style={styles.container}>
      {movies.map((data) => {
        return <Text>{data.title}</Text>;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
