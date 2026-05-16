import { useState } from "react";
import initialLayout from "../data/initialLayout.json";

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayout);

  return {
    layout,
    setLayout
  };
}