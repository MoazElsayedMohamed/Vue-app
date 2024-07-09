import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashboardContext } from "../pages/DashboardLayout";

const SmallSidebar = () => {
  const data = useDashboardContext();
  return <Wrapper>Small Sidebar</Wrapper>;
};

export default SmallSidebar;
