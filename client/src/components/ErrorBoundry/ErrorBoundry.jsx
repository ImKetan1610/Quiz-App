import React, { useState, useEffect } from "react";
import s from "./ErrorBoundry.module.css";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetErrorBoundary = () => {
    setHasError(false);
    setErrorMessage("");
  };

  useEffect(() => {
    const handleErrors = (error) => {
      setHasError(true);
      setErrorMessage(error.message);
    };

    // Capture any errors thrown by children components
    const errorListener = (event) => {
      handleErrors(event.error);
    };

    // Listen for unhandled errors and promise rejections
    window.addEventListener("error", errorListener);
    window.addEventListener("unhandledrejection", (event) =>
      handleErrors(event.reason)
    );

    return () => {
      window.removeEventListener("error", errorListener);
      window.removeEventListener("unhandledrejection", (event) =>
        handleErrors(event.reason)
      );
    };
  }, []);

  if (hasError) {
    return (
      <div className={s.errorContainer}>
        <div className={s.errorBoundary}>
          <h1>Something went wrong:</h1>
          <p>{errorMessage}</p>
          <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
