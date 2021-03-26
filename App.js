import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextAreaView, StatusBar,LogBox, SafeAreaView} from 'react-native';
import colors from './src/utils/colors';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

LogBox.ignoreAllLogs();

export default function App(){
  const [cantidad,setCantidad] = useState(null);
  const [interes,setInteres] = useState(null);
  const [meses,setMeses] = useState(null);
  const [total,setTotal] = useState(null);
  const [errorMessage,setErrorMessage] = useState('')

  useEffect(()=>{
    if (cantidad && interes && meses) calculate();
    else reset();
  },[cantidad, interes, meses]);

  const calculate = () =>{
    reset();
    if (!cantidad){
      setErrorMessage('No has ingresado ningun monto');
      console.log(errorMessage)
    } else if (!interes){
      setErrorMessage('añade los interes');
      console.log(errorMessage)
    } else if (!meses){
      setErrorMessage('añade los meses');
      console.log(errorMessage)
    }else{
      const i = interes/100;
      const mensual = (cantidad*(1+i))/meses;
      console.log(mensual)
      setTotal(
        {
          pmensual : mensual.toFixed(2),
          ptotal: (mensual*meses).toFixed(2)
        }
      );
    }
  };

  const reset = () =>{
    setErrorMessage('');
    setTotal(null)
  }

  return(
    <>

    <StatusBar barStyle = "light-content"/>
    <SafeAreaView style = {styles.safeArea}>
      <View style={styles.background}/>
      <Text style = {styles.titleApp}>Prestamos</Text>
      <Form
      setCantidad = {setCantidad}
      setInteres = {setInteres}
      setMeses = {setMeses}
      />
    </SafeAreaView>
    <ResultCalculation
    cantidad = {cantidad}
    interes = {interes}
    meses = {meses}
    total = {total}
    errorMessage = {errorMessage}
    />

    <Footer calculate = {calculate}/>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea:{
    height:290,
    alignItems:"center",

  },
  background:{
    backgroundColor: colors.PRIMARY_COLOR,
    height:200,
    width:'100%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius: 30,
    position:'absolute',
    zIndex:-1
  },
  titleApp:{
    fontSize:25,
    fontWeight:'bold',
    color: '#fff',
    marginTop:15
  }
});