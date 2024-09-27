import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from 'native-base';
import {Gap} from '@constants/gap';
import useStyles from '@src/screens/BusinessRegistration/styles';
import {makeId} from '@src/utils/helpers';
import {useThemeImages} from '@src/constants/images';
import {useThemeColors} from '@src/constants/colors';

const ReviewCard = (props: any) => {
  const styles = useStyles();
  const {title, data, editAction, open, standalone} = props;
  const colors = useThemeColors();
  const pictures = useThemeImages();

  const [showState, setShowState] = useState(open || false);

  return (
    <View style={{}}>
      {title && (
        <TouchableOpacity
          onPress={() => (standalone ? {} : setShowState(!showState))}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.mainText}>{title}</Text>
          {!standalone && (
            <Image
              source={!showState ? pictures.selectedBR : pictures.notSelectedBR}
              style={{
                height: hp(3),
                width: hp(3),
              }}
            />
          )}
        </TouchableOpacity>
      )}

      {editAction && showState && (
        <TouchableOpacity
          onPress={editAction}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 50,
            zIndex: 1,
          }}>
          <Text
            style={[
              styles.secondaryText,
              {
                color: colors.primary,
                marginRight: wp(1),
              },
            ]}>
            Edit
          </Text>
          <Image
            source={pictures.editIconPrimary}
            style={{
              width: hp(2),
              height: hp(2),
            }}
          />
        </TouchableOpacity>
      )}

      {showState && (
        <View>
          <Gap height={hp(1)} />
          {standalone ? null : (
            <>
              <View
                style={{height: 1, backgroundColor: colors.boxBorderColor}}
              />
              <Gap height={hp(2)} />
            </>
          )}

          {data.map((review: any) => {
            if (!review) return null;
            return (
              <View key={makeId()}>
                <Text style={styles.subText}>{review.heading}</Text>
                {review.type !== 'file' && (
                  <>
                    <Gap height={hp(1)} />
                    <Text style={styles.mainText}>{review.text || '-'}</Text>
                  </>
                )}

                {review.subtext ? (
                  <>
                    <Gap height={hp(1)} />
                    <Text style={styles.subText}>{review.subtext}</Text>
                  </>
                ) : null}

                {review.type === 'file' && review.file ? (
                  <>
                    <Gap height={hp(2)} />
                    {review.file.name ? (
                      <>
                        <View
                          style={{
                            backgroundColor: colors.boxBorderColor,
                            alignSelf: 'flex-start',
                            padding: 12,
                            borderRadius: 10,
                          }}>
                          <Image
                            source={pictures.documentIconReview}
                            style={{
                              width: hp(3),
                              height: hp(3),
                            }}
                          />
                        </View>

                        <Text style={[styles.secondaryText]}>
                          {review.file.name}{' '}
                          {review.name ? `- ${review.name}` : ''}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.mainText}>-</Text>
                    )}
                  </>
                ) : null}

                <Gap height={hp(2.5)} />
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default ReviewCard;
