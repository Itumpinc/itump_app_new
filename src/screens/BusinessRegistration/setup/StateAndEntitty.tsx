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
import {Button, RenderDropdown, RenderRadio} from '@src/components/hocs/forms';
import {getStateOptions} from '../Utils';
import {userApi} from '@src/store/services/user';

const Entity = (props: any) => {
  const {countryId} = props;
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const getEntities = userApi.useGetEntitiesQuery(countryId);
  const getEntitiesData = getData(getEntities);

  const options = [];
  if (getEntitiesData && getEntitiesData.length > 0) {
    for (let index = 0; index < getEntitiesData.length; index++) {
      const entity = getEntitiesData[index];
      options.push({
        value: entity.id,
        heading: entity.entity_name,
        // image: pictures.defaultProfile,
        label: entity.description,
      });
    }
  }

  return (
    <View>
      <RenderRadio name="entityType" options={options} />
    </View>
  );
};

export function StateAndEntitty(props: any) {
  const {schema, setSchema, stepAction} = props;
  const loadStateQuery = commonApi.useLoadStateQuery(schema.data.countryId);
  const stateList = getData(loadStateQuery);
  const colors = useThemeColors();
  const storage = useAppSelector(state => state.common.storage);
  const {user} = storage;
  const styles = useStyles();
  const options = getStateOptions(stateList);

  const state = schema.data.stateId
    ? options.find((option: any) => option.value === schema.data.stateId)
    : undefined;

  const submit = () => {
    stepAction('next');
  };

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

      {state && (
        <>
          <Gap height={hp(1)} />
          <Text style={styles.mainText}>
            Choose an Entity Type in {state.name}
          </Text>
          <Gap height={hp(1)} />
          <Entity countryId={schema.data.countryId} />
          <Gap height={hp(2)} />
          <Button
            text="Next"
            textColor="white"
            onPress={submit}
            disabled={!(state && schema.data.entityType)}
          />
          <Gap height={hp(5)} />
        </>
      )}
    </View>
  );
}
