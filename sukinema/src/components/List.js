import React from 'react';
import { View, Text } from 'react-native';

const List = ({ movie, openModal, initmovieID }) => {
  const initModal = () => {
    initmovieID(movie.index);
    openModal();
  };

  return (
    <View>
      <Text>test</Text>
    </View>
  );
};

export default List;
