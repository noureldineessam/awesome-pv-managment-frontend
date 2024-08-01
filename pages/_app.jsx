import { ApolloProvider } from '@apollo/client';
import graphqlClient from '@/lib/graphqlClient';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/styles/theme';
import CustomHead from '@/components/common/CustomHead';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApolloProvider client={graphqlClient}>
        <CustomHead />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  )
}
