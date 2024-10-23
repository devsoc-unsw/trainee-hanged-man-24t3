'use client'

import {Box} from "@mui/joy";
import {redirect} from "next/navigation";
import {getCookie} from "cookies-next";
import {useEffect, useState} from "react";
import {getUserById} from "@/database";
import {User} from "@/types";

export default function Home() {
  const userCookie = getCookie('token'); // Check if the user session exists
  if (!userCookie) {
    redirect('/login'); // Redirect to login page if not authenticated
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserById(userCookie).then(res => {
      setUser(res);
    });
  }, [userCookie]);

  return (
    <Box>
      Hi! {user?.username}
    </Box>
  )
}