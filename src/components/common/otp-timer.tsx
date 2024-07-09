import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useThemeColors} from '@constants/colors';

const OTPTimer = ({timeinsec, onResend, text}: any) => {
  const [startTimer, setStartTimer] = useState(false);
  const [counter, setCounter] = useState(timeinsec); // 60 seconds countdown
  const colors = useThemeColors();

  useEffect(() => {
    if (startTimer && counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [startTimer, counter]);

  const handleResend = () => {
    setStartTimer(true);
    setCounter(timeinsec); // Reset the counter
    onResend(); // Call the resend function passed as a prop
  };

  return (
    <>
      {startTimer && counter > 0 ? (
        <Text
          style={{
            color: colors.primary,
            fontFamily: 'Satoshi-Bold',
            fontSize: 14,
          }}>
          Resend code in {counter} sec
        </Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text
            style={{
              color: colors.primary,
              fontFamily: 'Satoshi-Bold',
              fontSize: 14,
            }}>
            {text || 'Send code again'}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default OTPTimer;
