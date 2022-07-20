import { EffectCallback, useEffect } from "react";

function useMount(func: EffectCallback) {
  useEffect(func, []);
}

export { useMount };
