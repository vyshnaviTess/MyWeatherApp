import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import styles from './Header.style';
// Define props type
interface HeaderProps {
  name: string; // Type for the name prop
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: '#6200ee',
        },
      }}
      style={styles.header}
    >
      <Title >
        {props.name}
      </Title>
    </Appbar.Header>
  );
};

export default Header;
