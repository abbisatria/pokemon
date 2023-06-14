import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

type Props = {
  name: string;
  pokemon: string;
  backgroundColor: string;
};

export default function CardPokemon({name, pokemon, backgroundColor}: Props) {
  return (
    <View style={[styles.card, {backgroundColor}]}>
      <Image
        style={styles.image}
        source={{
          uri: pokemon,
        }}
        resizeMode="cover"
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 10,
    borderRadius: 12,
    width: 150,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});
