import {View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {makeId} from '@src/utils/helpers';

const ReviewCard = (props: any) => {
  const styles = useStyles();
  const {data} = props;
  return (
    <View style={{}}>
      {data.map((review: any) => {
        return (
          <View key={makeId()}>
            <Text style={styles.subText}>{review.heading}</Text>
            <Gap height={hp(1)} />
            <Text style={styles.secondaryText}>{review.text}</Text>
            <Gap height={hp(2.5)} />
          </View>
        );
      })}
    </View>
  );
};

export default ReviewCard;
