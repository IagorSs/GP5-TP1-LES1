import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function NotFound () {
  const [redirectTimer, setRedirectTimer] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setRedirectTimer(redirectTimer - 1);
    }, 1000)
  }, [redirectTimer]);

  useEffect(() => {
    if (redirectTimer === 0) navigate("/");
  }, [redirectTimer, navigate]);

  return (
    <>
      <h1>Ops, parece que você se perdeu</h1>
      <h2>A página que você buscou não existe, você será redirecionado em {redirectTimer}</h2>
    </>
  )
}