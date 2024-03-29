import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "../templates/header";
import "../css/BoxTabs.css";
import DetalleColaboradores from "../Tabs/DetalleColaboradores";
import NotasColaboradores from "../Tabs/NotasColaboradores";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <h1 id="subtitulo_pagina">Mis cursos</h1>
      <div>
        <Box className="boxTabs">
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{ style: { background: "#e10b1c" } }}
              style={{ color: "#e10b1c", width: "100%", fontSize: "20pt" }}
            >
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Listado"
                {...a11yProps(0)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Notas"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
          <DetalleColaboradores></DetalleColaboradores>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <NotasColaboradores></NotasColaboradores>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
