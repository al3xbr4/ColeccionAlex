import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

function InformeColeccion({ getItems }) {
    const columnscoleccion = [
        { title: "ID", field: "id", type: "numeric" },
        { title: "Nombre", field: "nombre" },
        { title: "Login", field: "login" },
        { title: "Rol", field: "rol" },
        { title: "Contraseña", field: "password" },
      ];
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getItems(setTableData);
  }, [getItems]);

  return (
    <>
      <MaterialTable
        title="Informe de colección"
        columns={columnscoleccion}
        data={tableData}
        options={{
          filtering: true,
          draggable: true,
          columnsButton: true,
          exportMenu: [
            {
              label: "Exportar PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "PDF coleccion"),
            },
            {
              label: "Exportar CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "CSV coleccion"),
            },
          ],
        }}
      />
    </>
  );
}

export default InformeColeccion;
