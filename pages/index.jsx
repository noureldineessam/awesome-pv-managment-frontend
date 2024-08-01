import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '@/graphql/users/mutations';
import LoginForm from '@/components/common/LoginForm';
import client from '@/lib/graphqlClient';
import { useState } from 'react';

export default function Home() {
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, { client });
  const [mutationError, setMutationError] = useState(null);

  const handleLogin = async ({ email, password }) => {
    try {
      const { data } = await loginUser({ variables: { email, password } });
      if (data?.loginUser?.token) {
        localStorage.setItem('authToken', data.loginUser.token);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setMutationError(err);
    }
  };

  return (
    <main>
      <LoginForm onSubmit={handleLogin} loading={loading} error={mutationError || error} />
    </main>
  );
}
