import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface BasicTabsProps {
  pending: React.ReactNode;
  available: React.ReactNode;
  rejected: React.ReactNode;
  completed: React.ReactNode;
}

const BasicTabs: React.FC<BasicTabsProps> = ({
  available,
  pending,
  rejected,
  completed,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Pending" {...a11yProps(0)} />
          <Tab label="Available" {...a11yProps(1)} />
          <Tab label="Rejected" {...a11yProps(2)} />
          <Tab label="completed" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {pending}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {available}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {rejected}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        {completed}
      </CustomTabPanel>
    </Box>
  );
};

export default BasicTabs;
