import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../features/counter/counderSlice'; 

const Index = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <div style={{ textAlign: 'center', margin: '30px' }}>
      <h1>{count}</h1>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
}

export default Index;
