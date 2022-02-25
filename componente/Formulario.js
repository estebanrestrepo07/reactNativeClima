import React, { useState }from "react";
import { StyleSheet, TextInput, View, Text, TouchableWithoutFeedback, Animated, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";


const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
  const { ciudad, pais } = busqueda
  const [animacionBtn] = useState(new Animated.Value(1));
  const animacionIn = () => {
    Animated.spring(animacionBtn, {
      toValue: .9
    }).start()
  }
  const animacionOut = () => {
    Animated.spring(animacionBtn, {
      toValue: 1,
      friction: 1, // controlar el rebote de la animacion mas bajo el numero, mayor el rebote
      tension: 30 // mientras menor el numero mas suave el movimiento
    }).start()
  }

  const estilosAnimacion = [{scale: animacionBtn}];

  const consultarClima = () => {
    if(pais.trim() === '' || ciudad.trim() === ''){
      mostrarAlerta();
      return;
    }
    guardarConsultar(true);
  }

  const mostrarAlerta = () => {
    if ( Platform.OS === 'web' ){
      alert('Agrega una ciudad y pais para la busqueda')
    }else{

      Alert.alert('Error', 'Agrega una ciudad y pais para la busqueda', [{text: 'Entendido'}]);
    }
  }
  return (
    <>
      <View> 
        <View>
          <TextInput 
            value={ciudad}
            placeholder="Ciudad"
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
            <Picker.Item label="-- Seleccione un Pais --" value="" />
            <Picker.Item label="Estados Unidos" value="US" />
            <Picker.Item label="Mexico" value="MX" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Francia" value="FR" />
          </Picker>
        </View>

        <TouchableWithoutFeedback
          onPressIn={ () => animacionIn()}
          onPressOut={ ()=> animacionOut()}
          onPress={()=>consultarClima()}
        >
          <Animated.View style={[styles.btnBuscar, estilosAnimacion]}>
            <Text style={styles.textoBuscar}>
              Buscar Clima
            </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 20,
    textAlign: 'center'
  },
  picker: {
    height: 120,
    backgroundColor: '#fff'
  },
  btnBuscar:{
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center'
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18
  }
  
})

export default Formulario