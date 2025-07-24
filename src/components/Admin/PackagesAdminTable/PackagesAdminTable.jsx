import "./PackagesAdminTable.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { PackageEdit } from './PackageEdit/PackageEdit'
import { PackageRegistration } from "./PackageRegistration/PackageRegistration";
import  PackagesList  from "./PackagesList/PackagesList";

export const PackagesAdminTable = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "var(--no-active-tab)" }}>
          <TabList
            onChange={handleChange}
            aria-label="tabs de Pacotes"
            slotProps={{
              indicator: {
                sx: {
                  backgroundColor: "var(--orange-avanade)",
                },
              },
            }}
          >
            <Tab
              label="Listar Pacotes"
              value="1"
              sx={{
                color: "var(--text-footer)",
                "&.Mui-selected": {
                  color: "var(--orange-avanade)",
                },
              }}
            />
            <Tab
              label="Cadastrar Pacotes"
              value="2"
              sx={{
                color: "var(--text-footer)",
                "&.Mui-selected": {
                  color: "var(--orange-avanade)",
                },
              }}
            />
            <Tab
              label="Editar Pacotes"
              value="3"
              sx={{
                color: "var(--text-footer)",
                "&.Mui-selected": {
                  color: "var(--orange-avanade)",
                },
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1"><PackagesList/></TabPanel>
        <TabPanel value="2"><PackageRegistration/></TabPanel>
        <TabPanel value="3"><PackageEdit/></TabPanel>
      </TabContext>
    </Box>
  );
};
