import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN_USER } from '@/graphql/users/mutations';
import SignupForm from '@/components/common/SignupForm';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';

export default function Signup() {
    const [signupUser, { loading: signupLoading }] = useMutation(CREATE_USER);
    const [loginUser, { loading: loginLoading }] = useMutation(LOGIN_USER);
    const [mutationError, setMutationError] = useState(null);
    const router = useRouter();

    const handleSignup = async (formData) => {
        try {
            await signupUser({ variables: { user: { name: formData.name, email: formData.email, password: formData.password } } });
            const { data } = await loginUser({ variables: { email: formData.email, password: formData.password } });

            if (data?.loginUser?.token) {
                localStorage.setItem('authToken', data.loginUser.token);
                router.push('/dashboard');
            }
        } catch (err) {
            setMutationError(err);
        }
    };

    const isLoading = signupLoading || loginLoading;

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <SignupForm onSubmit={handleSignup} loading={isLoading} error={mutationError} />
        </Container>
    );
}
