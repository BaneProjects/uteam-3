import { Link } from 'react-router-dom';
import './Nav.css';
// import PropTypes from 'prop-types';
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

// Nav.propTypes = {
//   naslov: PropTypes.string
// };

export default Nav;
