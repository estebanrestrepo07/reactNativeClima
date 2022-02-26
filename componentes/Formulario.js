import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Alert, Platform} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Formulario = ({busqueda, guardarBusqueda,guardarConsulta, mostrarAlerta}) => {
  const {ciudad, pais} = busqueda

  const consultarClima = () => {
    if (pais.trim() === '' || ciudad.trim() === '' ) {
      const msg = 'Agrega una ciudad y un pais para la busqueda'
      mostrarAlerta(msg);
      return
    }
    guardarConsulta(true)
  }

  return (
    <View>
      <View>
        <TextInput 
          style={styles.input}value={ciudad} 
          placeholder='ciudad' 
          placeholderTextColor='#666'
          onChangeText={ ciudad => guardarBusqueda({...busqueda, ciudad})}
          />
      </View>
      <View>
        <Picker
          selectedValue={pais}
          itemStyle={styles.picker}
          onValueChange={ pais => guardarBusqueda({...busqueda, pais})}
        >
          <Picker.Item label='-- Seleccione un pais --' value='' />
          <Picker.Item label='EEUU' value='us' />
          <Picker.Item label='Mexico' value='mx' />
          <Picker.Item label='Colombia' value='co' />
          <Picker.Item label='Francia' value='fr' />
        </Picker>
      </View>

      <TouchableWithoutFeedback
        onPress={() => consultarClima()}
      >
        <View style={styles.btnBuscar}>
          <Text style={styles.textoBuscar}>Buscar Clima</Text>
        </View>
      </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 50,
    textAlign: 'center'
  },
  picker:{
    height:120,
    backgroundColor: '#fff',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center'
  },
  textoBuscar:{
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18
  }
});

export default Formulario