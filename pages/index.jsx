import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Image from 'next/image';
import Copyright from '../src/Copyright';
import { Button } from '@mui/material';

export default function Index({trendingResults,followResults}) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
        <Box sx={{ my: "12px", pt: "8px", borderRadius: "12px", width: { lg: "91%", xl: "75%" }, border: "1px solid #e0e0ee" }} >
          <Typography variant='subtitle2' fontSize="large" fontWeight='bold' px={2} component="h4">Who to follow</Typography>
          {
            followResults.map((result, index) => (
              <Box
                key={index}
                px={2}
                py={1}
                sx={{
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.2s ease-out",
                  "&:hover": {
                    backgroundColor: "#eee",
                    opacity: 0.9,
                  }
                }}
              >
                <Image
                  src={result.userImg}
                  width={50}
                  height={50}
                  objectFit="cover"
                  style={{ borderRadius: "100%" }}
                />
                <Box sx={{ ml: "16px", lineHeight: "20px" }} >
                  <Typography variant="subtitle2" fontWeight="bold" component="h4">{result.username}</Typography>
                  <Typography variant="body2" fontWeight="bold" fontStyle="italic" fontSize="small" component="h5">{result.tag}</Typography>
                </Box>
                <Button variant="text" size="small" sx={{ ml: "auto" }} >Follow</Button>
              </Box>
            ))
          }
          <Button fullWidth >
            Show more
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export async function getServerSideProps() {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  return {
    props: {
      trendingResults,
      followResults,
    },
  };
}


