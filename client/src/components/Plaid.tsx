// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

const Plaid = (props) => {
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    const response = await axios.post('http://localhost:3000/plaid/create-link-token', {}, { headers: { Authorization: `Bearer ` + props.token }, withCredentials: true });
    const data = response.data;

    setLinkToken(data.data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <Link linkToken={linkToken} token={props.token} /> : <></>;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null;
  token: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback((public_token, metadata) => {

    const response = axios.post('http://localhost:3000/plaid/exchange-public-token', { 
      public_token: public_token
    }, 
    { headers: { Authorization: `Bearer ` + props.token }, withCredentials: true });

    // Handle response ...
    console.log(response);
  }, []);
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};
export default Plaid;