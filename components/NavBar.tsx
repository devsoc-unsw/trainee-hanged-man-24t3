import {Box, Link, Sheet, Stack} from "@mui/joy";
import Image from 'next/image';

export default function NavBar() {
  return (
    <Sheet sx={{ height: 70, bgcolor: '#5996F2' }}>
      <Stack width='100%' height='100%' boxShadow='md' direction='row' alignItems='center' px={1}>
        <Box sx={{flex: '0.5'}}>
          <Link href='/'>
            <Image src='/logo.svg' alt='logo' height={60} width={200}/>
          </Link>
        </Box>
      </Stack>
    </Sheet>
  );
}