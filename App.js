import React, { useEffect, useState }from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert, Platform} from 'react-native';
import Clima from './componente/Clima';
import Formulario from './componente/Formulario';

const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais:'',
  })

  const {ciudad, pais} = busqueda;

  const [consultar, guardarConsultar] = useState(false);
  const [datos, guardarDatos] = useState(false);
  const [bgColor, guardarBgColor] = useState('lightblue');

  useEffect(()=>{
    const consultarClima = async () => {
      if (consultar){
        const apiKey = 'c62d1b64c7ff8a5b19a105e5293c498f'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`
        try {
          console.log(url)
          const respuesta = await fetch(url);
          const data = await respuesta.json();
          if(data.cod === '404'){
            mostrarAlerta()
          } else {
            guardarDatos(data);
            guardarConsultar(false);

            //modifica los colores de fondo basado en temperatura

            const kelvin = 273.15;
            const {main} = data;
            const actual = main.temp - kelvin

            if (actual < 10) {
              guardarBgColor('lightgray')
            } else if(actual >= 10 && actual < 25) {
              guardarBgColor('lightblue')
            } else{
              guardarBgColor('lightcoral')
            }
          }
        } catch (error) {
          mostrarAlerta();
        }
      } 
    }
    consultarClima();
  }, [consultar])

  const mostrarAlerta = () => {
    const mensajeAlerta = 'No hay resultados, por favor intenta con otra ciudad o pais';
    if ( Platform.OS === 'web' ){
      alert(mensajeAlerta);
    }else{

      Alert.alert('Error', mensajeAlerta, [{text: 'Entendido'}]);
    }
  }
  
  const ocultarTeclado = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={ () => ocultarTeclado() }>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
          <Clima resultado={datos} />
          <Formulario
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda} 
            guardarConsultar={guardarConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
})

export default App
