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

export function BusinessInformation(props: any) {
  const pictures = useThemeImages();

  const {schema} = props;
  const styles = useStyles();
  const { status, toggleTab} = props;

  return (
    <View>
      <GetTabHeader {...props} />
      {status !== 'inactive' && (
        <View>
          <Gap height={hp(2)} />
          <Text style={styles.subText}>
            Let us get started with the basic information of your company
          </Text>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={pictures.business.first}
              style={{
                height: wp(60),
                width: wp(70),
              }}
            />
          </View>

          <Gap height={hp(2)} />
          <Text style={styles.mainText}>Industry</Text>
          <Gap height={hp(1)} />
          <RenderDropdown
            name="industry_type"
            value={schema.data.industry_type}
            placeHolder="Select Industry"
            options={industry}
          />

          <Text style={styles.mainText}>Website</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="website"
            value={schema.data.website}
            placeHolder="Enter Business Website (Optional)"
          />

          <Text style={styles.mainText}>Description</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="description"
            value={schema.data.description}
            placeHolder="Brief Description of the Business"
            multiline
            maxLength={150}
          />

          <Text style={styles.mainText}>Business Registration Address</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="address1"
            value={schema.data.address1}
            placeHolder="Enter Business address"
          />

          <Text style={styles.mainText}>Address Line 2</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="address2"
            value={schema.data.address2}
            placeHolder="Address Line 2 (Optional)"
          />

          <Text style={styles.mainText}>City</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="city"
            value={schema.data.city}
            placeHolder="City"
          />

          <Text style={styles.mainText}>Zip/Postal Code</Text>
          <Gap height={hp(1)} />
          <RenderInput
            name="zipcode"
            value={schema.data.zipcode}
            placeHolder="Enter Zipcode"
          />

          <Gap height={hp(2)} />
          <Button text="Next" textColor='white' onPress={()=>toggleTab('Shares')}/>
          <Gap height={hp(4)} />
        </View>
      )}
    </View>
  );
}
