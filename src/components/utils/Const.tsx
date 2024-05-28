import { Dispatch, SetStateAction } from "react";

// TYPES
export type StateType<T> = [T, Dispatch<SetStateAction<T>>];


