import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import MainFeaturedPost from './MainFeaturedPost';

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

const mainFeaturedPost1 = {
  title: 'You can share your blogs ',
  description:
    "Food blogs a lot of people want to upload Here you can share blogs Comment on posts and more",

};

const mainFeaturedPost2 = {
  title: 'Select a post to upload',
  description:"It is important which topic you choose to upload, you will have to take one of the categories offered when uploading a post ",


};

const mainFeaturedPost3 = {
  title: 'Choose an image for your post',
  description:
    "Choose a suitable image for the content of the post to make the post more colorful and refreshing",


};

const mainFeaturedPost4 = {
  title: 'Click send and post in the air ',
  description:
    "How fun that many people will be able to read your post and comment on it",


};

const defaultTheme = createTheme();

export default function HomePage() {

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch({ type: 'GET_SHARINGS' });
  // }, [])
  

  // return (
  //       <>
  //   <h1>hadassa</h1>
  //   <ThemeProvider theme={defaultTheme}  >
  //     <CssBaseline />
  //     <Container maxWidth="lg">
  //       <MainFeaturedPost post={mainFeaturedPost1} />
  //       <br></br><br></br><br></br><br></br><br></br><br></br>
  //       <MainFeaturedPost post={mainFeaturedPost2} />
  //       <br></br><br></br><br></br><br></br><br></br><br></br>
  //       <MainFeaturedPost post={mainFeaturedPost3} />
  //       <br></br><br></br><br></br><br></br><br></br><br></br>
  //       <MainFeaturedPost post={mainFeaturedPost4} />
  //           {/* <Sidebar
  //             // title={sidebar.title}
  //             archives={sidebar.archives}
  //             social={sidebar.social}
  //           /> */}

  //           {/* {dispatch.map((sharing)=>(sharing.title)} */}
  //     </Container> 

 
  //   </ThemeProvider>
  //   </>
  // );
}