import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/Link';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import {useOneTap} from "../src/gaccount/useGsiOneTap";
import GoogleSignin from "../src/gaccount/GoogleSignin";

const Home: NextPage = () => {
    //const [hasToken, token] = useOneTap("'503235405020-dk0155196kdp2ug3nlhuibs11tfvibuq.apps.googleusercontent.com'", false)



    return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
          {/*{hasToken &&
          <Typography variant="body1">
              We got a token
          </Typography>
          }
          {token &&
          <Typography variant="body1">
              Welcome: {token.given_name} {token.family_name}
          </Typography>
          }*/}
          <GoogleSignin clientId={'503235405020-dk0155196kdp2ug3nlhuibs11tfvibuq.apps.googleusercontent.com'}/>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
};

export default Home;
