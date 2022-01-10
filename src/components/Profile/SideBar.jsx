import { Box, Link } from '@chakra-ui/react';

const SideBar = () => {
  return (
    <Box
      display="flex"
      m={{ base: '0 auto' }}
      alignItems={{ base: 'center', md: 'flex-start' }}
      color="white"
      fontSize={{ base: '12px', sm: '14px', md: '16px' }}
      fontWeight="bold"
      flexDirection={{ base: 'row', md: 'column' }}
      p={{ base: '', md: '20px' }}
      textAlign={{ base: 'center', md: '' }}>
      <Link p="10px 10px" href="#">
        Pending for approval
      </Link>
      <Link p="10px 10px" href="#">
        Team
      </Link>
      <Link p="10px 10px" href="#">
        Questions
      </Link>
      <Link p="10px 10px" href="#">
        Company info
      </Link>
      <Link p="10px 10px" href="#">
        My Profile
      </Link>
    </Box>
  );
};

export default SideBar;
