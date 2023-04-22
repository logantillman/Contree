// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
const Plaid = () => {
  console.log("HERERHEEHRERE");
  const [linkToken, setLinkToken] = useState(null);
  const generateToken = async () => {
    console.log("generating token");
    const response = await fetch('http://localhost:3000/plaid/create-link-token', {
      method: 'POST',
      headers: {
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJlMzhjODUyYzcxODZjZDJmZGZmMCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2ODE2MjE1MzQsImV4cCI6MTY4MTcwNzkzNH0.p2tEIWRcnDckqwCRV54vLa9eBiSjrMMooN5uH6B-lQo"
      }
    });
    const data = await response.json();
    console.log(data);
    console.log(data.data.link_token);
    setLinkToken(data.data.link_token);
  };
  useEffect(() => {
    generateToken();
  }, []);
  return linkToken != null ? <Link linkToken={linkToken} /> : <></>;
};
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    console.log("sending public token to server");
    const response = fetch('http://localhost:3000/plaid/exchange-public-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDJlMzhjODUyYzcxODZjZDJmZGZmMCIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE2ODE2MjE1MzQsImV4cCI6MTY4MTcwNzkzNH0.p2tEIWRcnDckqwCRV54vLa9eBiSjrMMooN5uH6B-lQo"
      },
      body: JSON.stringify({ public_token }),
    });
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