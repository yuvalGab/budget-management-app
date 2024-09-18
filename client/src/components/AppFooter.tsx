import { memo } from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

function AppFooter(): JSX.Element {
  return (
    <Footer style={{ padding: "10px 50px" }}>
      <div>
        <Text>Developed by Yuval Gabian</Text>
      </div>
    </Footer>
  );
}

export default memo(AppFooter);
