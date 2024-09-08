import {Text} from 'native-base';
import {Image, Pressable, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useStyles from '../../styles';
import {useThemeImages} from '@src/constants/images';
import {useThemeColors} from '@src/constants/colors';

export const GetTabHeader = (props: any) => {
  const pictures = useThemeImages();
  const colors = useThemeColors();
  const styles = useStyles();
  const {toggleTab, id, title, status} = props;

  let tabIcon = null;
  switch (status) {
    case 'active':
      tabIcon = pictures.notSelectedBR;
      break;
    case 'inactive':
      tabIcon = pictures.selectedBR;
      break;
    case 'done':
      tabIcon = pictures.doneBR;
      break;

    default:
      break;
  }

  return (
    <>
      <Pressable
        onPress={() => toggleTab(id)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <Text style={styles.mainText}>{title}</Text>
        <Image
          source={tabIcon}
          alt="icon"
          style={{
            height: hp(2.4),
            width: hp(2.4),
          }}
        />
      </Pressable>
      {status === 'active' ? null : (
        <View style={{height: 1, backgroundColor: colors.boxBorderColor}} />
      )}
    </>
  );
};
