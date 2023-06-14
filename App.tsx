import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import http from './helpers/http';
import CardPokemon from './components/CardPokemon';
import {generateColor} from './helpers/color';

type DataPokemon = {
  id: number;
  name: string;
  image: string;
  backgroundColor: string;
};

const App = (): JSX.Element => {
  const [data, setData] = useState<DataPokemon[]>([]);
  const [limit, setLimit] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);
    const response = await http().get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`,
    );
    const result = response.data.results.map(
      (resp: DataPokemon, index: number) => ({
        id: index + 1,
        name: resp.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          index + 1
        }.png`,
        backgroundColor: generateColor(),
      }),
    );
    setData(result);
    setLoading(false);
  }, [limit]);

  useEffect(() => {
    getData();
  }, [getData]);

  const next = async () => {
    if (limit + 20 < 10000) {
      setLimit(limit + 20);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pokedex</Text>
      </View>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {data.length > 0 ? (
        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.gap}>
              <CardPokemon
                name={item.name}
                pokemon={item.image}
                backgroundColor={item.backgroundColor}
              />
            </View>
          )}
          keyExtractor={item => String(item.id)}
          onEndReached={next}
          onEndReachedThreshold={0.5}
        />
      ) : (
        <Text>Data Not Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'red',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#FFFFFF',
  },
  gap: {
    padding: 5,
  },
});

export default App;
