'use client';

import { useState } from 'react';
import {redirect, useRouter} from 'next/navigation';
import {getCookie, setCookie} from 'cookies-next';
import {FormLabel, Input, Button, Typography, Alert, Stack, FormControl, Card} from '@mui/joy';
import {createUser, getUser} from "@/database";
import {Level, User} from "@/types";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const userCookie = getCookie('token'); // Check if the user session exists
  if (userCookie) {
    redirect('/'); // Redirect to home page if authenticated
  }

  const handleLogin = async () => {
    try {

      // Query the database for the user
      const user = await getUser(username, password);

      if (user) {
        // Login success: Store user session in cookies and redirect
        console.log(user._id);
        setCookie("token", user._id);
        router.push('/');
      } else {
        // Login failed - Create new user (can implement separate Sign Up later)
        // setError('Invalid username or password.');
        const level1: Level = {
          levelNumber: 1,
          wallpaper: null,
          flooring: null,
          furniture: []
        }

        const defaultUser: Omit<User, '_id'> = {
          password: password, // store raw for now
          username: username,
          coins: 0,
          exp: 0,
          userLevel: 1,
          inventory: [],
          dailyTasks: [],
          mainQuest: [],
          tower: {
            numLevels: 1,
            levels: [level1],
          },
        };

        const userId = await createUser(defaultUser)
        setCookie("token", userId);
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Incorrect credentials');
    }
  };

  return (
    <Stack justifyContent='center' alignItems='center' pt={20}>
      <Card>
        <Stack
          p={5}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          gap={2}
        >
          <Typography level="h4">Login</Typography>
          {error && <Alert color="danger">{error}</Alert>}
          <Stack spacing={1}>
            <FormControl>
              <FormLabel sx={{ fontSize: "md" }}>Username</FormLabel>
              <Input
                size="lg"
                sx={{ fontSize: "lg" }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel sx={{ fontSize: "md" }}>Password</FormLabel>
              <Input
                size="lg"
                sx={{ fontSize: "lg" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
          </Stack>
          <Button onClick={handleLogin}>Submit</Button>
        </Stack>
      </Card>

    </Stack>
  );
}
