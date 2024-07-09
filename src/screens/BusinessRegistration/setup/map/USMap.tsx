import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import React from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useAppSelector} from '@src/store/store';
import {commonApi} from '@src/store/services/common';
import {getData} from '@src/utils/helpers';
import { updateSchema } from '@src/components/hocs/forms/form';

export const USMap = ({value, setSchema, schema}: {value: number, setSchema:any, schema:any}) => {
  const pictures = useThemeImages();
  const loadCountryQuery = commonApi.useLoadCountryQuery();
  const countryList = getData(loadCountryQuery);
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;

  const states = [
    {id: 2, code: 'AK', name: 'Alaska', top: hp('0%'), left: wp('0%')},
    {id: 19, code: 'ME', name: 'Maine', top: hp('0%'), left: wp('80%')},

    {id: 49, code: 'WI', name: 'Wisconsin', top: hp('4%'), left: wp('40.5%')},
    {id: 45, code: 'VT', name: 'Vermont', top: hp('4%'), left: wp('72.5%')},
    {id: 29, code: 'NH', name: 'New Hampshire', top: hp('4%'), left: wp('80%')},

    {id: 47, code: 'WA', name: 'Washington', top: hp('8%'), left: wp('0%')},
    {id: 12, code: 'ID', name: 'Idaho', top: hp('8%'), left: wp('8.5%')},
    {id: 26, code: 'MT', name: 'Montana', top: hp('8%'), left: wp('16.5%')},
    {
      id: 34,
      code: 'ND',
      name: 'North Dakota',
      top: hp('8%'),
      left: wp('24.5%'),
    },
    {id: 23, code: 'MN', name: 'Minnesota', top: hp('8%'), left: wp('32.5%')},
    {id: 13, code: 'IL', name: 'Illinois', top: hp('8%'), left: wp('40.5%')},
    {id: 22, code: 'MI', name: 'Michigan', top: hp('8%'), left: wp('48.5%')},
    {id: 32, code: 'NY', name: 'New York', top: hp('8%'), left: wp('64.5%')},
    {
      id: 21,
      code: 'MA',
      name: 'Massachusetts',
      top: hp('8%'),
      left: wp('72.5%'),
    },

    {id: 37, code: 'OR', name: 'Oregon', top: hp('12%'), left: wp('0%')},
    {id: 28, code: 'NV', name: 'Nevada', top: hp('12%'), left: wp('8.5%')},
    {id: 50, code: 'WY', name: 'Wyoming', top: hp('12%'), left: wp('16.5%')},
    {
      id: 41,
      code: 'SD',
      name: 'South Dakota',
      top: hp('12%'),
      left: wp('24.5%'),
    },
    {id: 15, code: 'IA', name: 'Iowa', top: hp('12%'), left: wp('32.5%')},
    {id: 14, code: 'IN', name: 'Indiana', top: hp('12%'), left: wp('40.5%')},
    {id: 35, code: 'OH', name: 'Ohio', top: hp('12%'), left: wp('48.5%')},
    {
      id: 38,
      code: 'PA',
      name: 'Pennsylvania',
      top: hp('12%'),
      left: wp('56.5%'),
    },
    {id: 30, code: 'NJ', name: 'New Jersey', top: hp('12%'), left: wp('64.5%')},
    {id: 7, code: 'CT', name: 'Connecticut', top: hp('12%'), left: wp('72.5%')},
    {id: 39, code: 'RI', name: 'Rhode Island', top: hp('12%'), left: wp('80%')},

    {id: 5, code: 'CA', name: 'California', top: hp('16%'), left: wp('0%')},
    {id: 44, code: 'UT', name: 'Utah', top: hp('16%'), left: wp('8%')},
    {id: 6, code: 'CO', name: 'Colorado', top: hp('16%'), left: wp('16.5%')},
    {id: 27, code: 'NE', name: 'Nebraska', top: hp('16%'), left: wp('24.5%')},
    {id: 25, code: 'MO', name: 'Missouri', top: hp('16%'), left: wp('32.5%')},
    {id: 17, code: 'KY', name: 'Kentucky', top: hp('16%'), left: wp('40.5%')},
    {
      id: 48,
      code: 'WV',
      name: 'West Virginia',
      top: hp('16%'),
      left: wp('48.5%'),
    },
    {id: 46, code: 'VA', name: 'Virginia', top: hp('16%'), left: wp('56.5%')},
    {id: 20, code: 'MD', name: 'Maryland', top: hp('16%'), left: wp('64.5%')},
    {id: 8, code: 'DE', name: 'Delaware', top: hp('16%'), left: wp('72.5%')},

    {id: 3, code: 'AZ', name: 'Arizona', top: hp('20%'), left: wp('8.5%')},
    {id: 31, code: 'NM', name: 'New Mexico', top: hp('20%'), left: wp('16.5%')},
    {id: 16, code: 'KS', name: 'Kansas', top: hp('20%'), left: wp('24.5%')},
    {id: 4, code: 'AR', name: 'Arkansas', top: hp('20%'), left: wp('32.5%')},
    {id: 42, code: 'TN', name: 'Tennessee', top: hp('20%'), left: wp('40.5%')},
    {
      id: 33,
      code: 'NC',
      name: 'North Carolina',
      top: hp('20%'),
      left: wp('48.5%'),
    },
    {
      id: 40,
      code: 'SC',
      name: 'South Carolina',
      top: hp('20%'),
      left: wp('56.5%'),
    },
    {
      id: 51,
      code: 'DC',
      name: 'District of columbia',
      top: hp('20%'),
      left: wp('64.5%'),
    },

    {id: 36, code: 'OK', name: 'Oklahoma', top: hp('24%'), left: wp('24.5%')},
    {id: 18, code: 'LA', name: 'Louisiana', top: hp('24%'), left: wp('32.5%')},
    {
      id: 24,
      code: 'MS',
      name: 'Mississippi',
      top: hp('24%'),
      left: wp('40.5%'),
    },
    {id: 1, code: 'AL', name: 'Alabama', top: hp('24%'), left: wp('48.5%')},
    {id: 10, code: 'GA', name: 'Georgia', top: hp('24%'), left: wp('56.5%')},

    {id: 11, code: 'HI', name: 'Hawaii', top: hp('28%'), left: wp('0%')},
    {id: 43, code: 'TX', name: 'Texas', top: hp('28%'), left: wp('32.5%')},
    {id: 9, code: 'FL', name: 'Florida', top: hp('28%'), left: wp('64.5%')},

    {
      id: 52,
      code: 'PR',
      name: 'Puerto Rico',
      top: hp('32%'),
      left: wp('80.5%'),
    },
  ];

  const handleStatePress = (state:any) => {
    setSchema(updateSchema(schema, "data", "stateId", state.id));
  };

  return (
    <>
      {states.map(state => (
        <TouchableOpacity
          key={state.name}
          style={[
            styles.stateButton,
            {
              top: state.top,
              left: state.left,
              backgroundColor: value === state.id ? colors.primary : colors.cardColorNotSelected,
            },
          ]}
          onPress={() => handleStatePress(state)}>
          <Text
            style={{
              color: value === state.id ? colors.buttonText : colors.boldText,
              fontSize: 10,
              fontFamily: 'Satoshi-Bold',
            }}>
            {state.code}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  stateButton: {
    position: 'absolute',
    width: wp('7%'),
    height: wp('7.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
