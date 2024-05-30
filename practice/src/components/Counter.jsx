import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../app/features/counter/counterSlice";
export default function Counter() {
  const count = useSelector((state) => state.counterSher.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>{count}</div>
      <button
        className="incr"
        onClick={() => {
          dispatch(increment());
        }}
      >
        +
      </button>
      <button
        className="decr"
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -
      </button>
    </div>
  );
}
