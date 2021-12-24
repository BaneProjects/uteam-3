import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

const Nav = () => {
  return (
    <div className="nav">
      <div className="navLR">
        <Link to={'/'}>
          <Text mr={2}>Login</Text>
        </Link>
        <Link to={'register'} className="navRegister">
          Register
        </Link>
      </div>
    </div>
  );
};


export default Nav;
