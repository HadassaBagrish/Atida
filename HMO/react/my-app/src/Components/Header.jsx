import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
// import Logo from './logo';

function Header(props) {

  const { sections, title } = props;
    const navigateTo=useNavigate();

  return (
    <>
    <React.Fragment >
      {/* <Button size="small" >Subscribe</Button> */}
       <Toolbar 
        // sx={{ borderBottom: 1.5, borderColor: 'pink' }}
      >
        <Typography
          component="h2"
          variant="h5"
          color="red"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >

        {/* logo */}
         {/* <Logo></Logo> */}
        
        </Typography>


      {/* search-כולל ICON */}
       {/* < SearchAppBar size="small"></SearchAppBar> */}
      
        {/* SignInכפתור מעבר ל */}
        {/* <Button variant="outlined" size="medium" sx={{borderColor:"black" , color:"black"}} onClick={() => {navigateTo('/')}}>
          Sign In
        </Button> */}
      </Toolbar>


      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' , backgroundColor:"pink"}}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            sx={{ p: 1, flexShrink: 0 }}
            onClick={()=>{navigateTo(section.url)}}
            
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    //   url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;