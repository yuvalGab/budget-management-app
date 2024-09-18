import { memo } from "react";
import { Layout, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

function AppHeader(): JSX.Element {
  return (
    <Header>
      <Text style={{ color: "white" }}>Budget Management</Text>
    </Header>
  );
}

export default memo(AppHeader);
