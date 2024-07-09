import {useCallback, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const useFocusedEffect = (callback: any, dependencies: any[]) => {
  useFocusEffect(
    useCallback(() => {
      const effectCleanup = callback();
      return () => {
        if (effectCleanup) {
          effectCleanup();
        }
      };
    }, dependencies),
  );
};

export default useFocusedEffect;
