import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementar, decrementar } from '../store/index.tsx';
import {StateType} from  '../types/state.type.tsx'

const Contador = ({ titulo }) => {
  // Acessa o estado do Redux
  const counter = useSelector((state: StateType) => { 
    return state.counter});

  // Dispacha ações
  const dispatch = useDispatch();

  const aumentar = () => dispatch(incrementar());
  const diminuir = () => dispatch(decrementar());

  return (
    <div>
      <h1>{titulo}</h1>
      <p>Contador: {counter}</p>
      <button onClick={aumentar}>Incrementar</button>
      <button onClick={diminuir}>Decrementar</button>
    </div>
  );
};

export default Contador;
