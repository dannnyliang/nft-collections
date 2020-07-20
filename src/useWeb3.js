import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [error, setError] = useState();
  const [web3, setWeb3] = useState();

  const initWeb3 = async () => {
    if (!window.web3) {
      setError(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return;
    }

    setWeb3(new Web3(window.web3.currentProvider));
  };

  useEffect(() => {
    window.addEventListener("load", initWeb3);
    return () => {
      window.removeEventListener("load", initWeb3);
    };
  }, []);

  return {
    web3,
    error,
  };
};

export default useWeb3;
