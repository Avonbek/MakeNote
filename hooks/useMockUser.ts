import { useState, useEffect } from "react";

interface MockUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function useMockUser() {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    // Simulate a delay in user loading
    const timer = setTimeout(() => {
      setUser({
        id: "mock-user-id",
        firstName: "Mock",
        lastName: "User",
        email: "mock@example.com",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { user, isLoaded: user !== null, isSignedIn: user !== null };
}
