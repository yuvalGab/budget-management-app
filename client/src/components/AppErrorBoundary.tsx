import React, { ReactNode } from "react";
import { Alert, Flex, message } from "antd";
import styled from "styled-components";

const GENERAL_ERROR_MESSAGE = "Some error occurred";

const AlertContainer = styled(Flex)`
  height: 100vh;
`;

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  hasError: boolean;
}

class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Caught by Error Boundary:", error, errorInfo);
    message.error(GENERAL_ERROR_MESSAGE);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <AlertContainer justify="center" align="center">
          <Alert message={GENERAL_ERROR_MESSAGE} type="error" showIcon />
        </AlertContainer>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
