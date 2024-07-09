import {View} from 'react-native';

import React from 'react';
import {useThemeImages} from '@constants/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {useThemeColors} from '@constants/colors';
import {useAppSelector} from '@src/store/store';
import {Gap} from '@src/constants/gap';
import {commonApi} from '@src/store/services/common';
import {getData} from '@src/utils/helpers';
import useStyles from '../styles';
import {USMap} from './map/USMap';
import {RenderDropdown, RenderRadio} from '@src/components/hocs/forms';
import {getStateOptions} from '../Utils';

const Entity = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  return (
    <View>
      <RenderRadio
        name="entityType"
        options={[
          {
            value: 'llc',
            heading: 'Limited Liability Companies',
            image: pictures.defaultProfile,
            label:
              'Easy to afford and own, making them the favored choice for small and new business proprietors.',
          },
          {
            value: 'corp',
            heading: 'Corporation',
            image: pictures.defaultProfile,
            label:
              'Although more intricate and costly, they serve as excellent means for formal ownership and management structures, as well as for raising substantial capital.',
          },
        ]}
      />
    </View>
  );
};

export function StateAndEntitty(props: any) {
  const loadStateQuery = commonApi.useLoadStateQuery(226);
  const stateList = getData(loadStateQuery);
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const styles = useStyles();
  const options = getStateOptions(stateList);
  const {schema, setSchema} = props;

  return (
    <View>
      <View style={{position: 'relative', height: hp('40%'), marginLeft: 5}}>
        <USMap
          value={schema.data.stateId}
          setSchema={setSchema}
          schema={schema}
        />
      </View>
      <View>
        <Text style={styles.mainText}>
          Where will (or did) you file your company?
        </Text>
        <Gap height={hp(1)} />
        <Text style={styles.subText}>
          Most business owners choose the state where they first conduct
          business or hold assets.
        </Text>
      </View>
      <Gap height={hp(2)} />
      <RenderDropdown
        name="stateId"
        placeHolder="Select State"
        backgroundColor={colors.inputField}
        textColor={colors.primaryText}
        options={options}
      />

      <Gap height={hp(1)} />
      <Text style={styles.mainText}>Choose an Entity Type in Delaware</Text>
      <Gap height={hp(1)} />
      <Entity />
    </View>
  );
}
