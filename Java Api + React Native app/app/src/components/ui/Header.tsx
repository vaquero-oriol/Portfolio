import { StyleSheet } from 'react-native';
import { Appbar, AppbarActionProps } from 'react-native-paper';

type HeaderProps = {
  title?: string;
  center?: boolean;
  leftIcon?: AppbarActionProps['icon'];
  onPressLeftIcon?: AppbarActionProps['onPress'];
  rightIcon?: AppbarActionProps['icon'];
  onPressRightIcon?: AppbarActionProps['onPress'];
};

const Header = ({
  title,
  center,
  leftIcon = 'bell',
  rightIcon = 'account',
  onPressLeftIcon,
  onPressRightIcon,
}: HeaderProps) => {
  return (
    <Appbar.Header>
      <Appbar.Action icon={leftIcon} onPress={onPressLeftIcon} />
      <Appbar.Content title={title} style={center && styles.headerTitle} />
      <Appbar.Action icon={rightIcon} onPress={onPressRightIcon} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    alignItems: 'center',
  },
});

export default Header;
