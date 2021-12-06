import React from "react";
import { useHistory } from "react-router-dom";

function LoadingToRedirect(){
  const [count, setCount] = React.useState(5);
  let history = useHistory();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && history.push("/");
    // cleanup
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div className="container">
      <h1 className="text-redirect">Redirecting you in <span className="text-danger">{count}</span> seconds</h1>
    </div>
  );
};

export default LoadingToRedirect;
