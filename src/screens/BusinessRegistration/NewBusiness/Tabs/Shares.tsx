import {View, Image} from 'react-native';

import React, {useEffect} from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {Gap} from '@src/constants/gap';
import {RenderDropdown, RenderInput} from '@src/components/hocs/forms';
import useStyles from '../../styles';
import {industry} from '@src/utils/services';
import {GetTabHeader} from './Utils';
import Button from '@src/constants/button';

export function Shares(props: any) {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const {schema} = props;
  const styles = useStyles();
  const {status, toggleTab} = props;

  return (
    <View>
      <GetTabHeader {...props} />
      {status === 'active' && (
        <View>
          <Gap height={hp(2)} />
          <Text style={styles.subText}>
            Tell us about your shares and structure
          </Text>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.second}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>

          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Total Authorized Shares</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="total_shares"
            value={schema.data.total_shares}
            placeHolder="0"
            mode="number"
          />

          <Text style={styles.mainText}>Share Par Value ($)</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="value_per_share"
            value={schema.data.value_per_share}
            placeHolder="0"
            mode="number"
          />

          <Gap height={hp(2)} />
          <Button
            text="Next"
            textColor="white"
            onPress={() => toggleTab('Shareholder')}
          />
          <Gap height={hp(4)} />
        </View>
      )}
    </View>
  );
}
