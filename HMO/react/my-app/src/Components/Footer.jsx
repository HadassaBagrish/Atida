import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Logo from './logo';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import XIcon from '@mui/icons-material/X';

// const sidebar = {
//   social: [
//     { name: 'GitHub', icon: GitHubIcon },
//     { name: 'X', icon: XIcon },
//     { name: 'Facebook', icon: FacebookIcon },
//   ],
// };

function Footer(props) {

  const { description, title } = props;

return(
  <>
  <Box component="footer" sx={{backgroundColor: "pink", width: "100%" }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Typography component="h2" variant="h5" align="center" noWrap>
    {/* <Logo></Logo> */}
  </Typography>

  <Typography variant="h6" align="center" gutterBottom>
    {title}
  </Typography>

  <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
    {description}
    
  </Typography>
   <Typography>BAKECLICK by Chedva Josefsberg 2023</Typography>
  
</div>

  </Box>
</>
)}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Footer;