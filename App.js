import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Platform} from 'react-native';
import Formulario from './componentes/Formulario';
import Clima from './componentes/Clima';

const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad:'',
    pais:'',
  })

  const [consultar, guardarConsulta] = useState(false)
  const [datos,guardarDatos] = useState('');
  const {ciudad, pais} = busqueda;

  useEffect(()=>{
    const consultarClima = async () => {
      if (consultar) {
        const apiKey = 'c62d1b64c7ff8a5b19a105e5293c498f';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
        try {
          const respuesta = await fetch(url);
          const data = await respuesta.json();

          if(data.cod === '404'){
            mostrarAlerta('No hay resultados, intenta otra ciudad o pais')
          } else{
            guardarDatos(data)
            guardarConsulta(false)
          }
        } catch  {
          mostrarAlerta('No hay resultados, intenta otra ciudad o pais')
        }
      }
    }
    consultarClima()
  }, [consultar])

  const mostrarAlerta = (msg)=>{
    if ( Platform.OS === 'web' ) {
      alert(msg)
    }else{
      Alert.alert('Error', msg, [{text: 'Entendido'}])
    }
  }

  return (
    <View style={styles.app}>
      <View style={styles.contenido}>
        <Clima resultados={datos} />
        <Formulario 
          busqueda={busqueda} 
          guardarBusqueda={guardarBusqueda} 
          guardarConsulta={guardarConsulta}
          mostrarAlerta={mostrarAlerta}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app:{
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center'
  },
  contenido:{
    marginTop: 10,
    marginHorizontal: '2.5%'
  }
});

export default App;