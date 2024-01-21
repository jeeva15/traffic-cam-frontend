import React from "react";

import styles from "./style.module.scss";
import cx from "classnames";
import Button from "../Button";

interface Column {
  label: string;
  field: string;
  showButton?: boolean;
  hideLabelinMobile?: boolean;
}

interface Row {
  [key: string]: any;
}

interface Props {
  columns: Column[];
  rows: Row[];
  onRowClick: (param: any) => void;
  className?: string;
  title?: string;
}
const Table: React.FC<Props> = ({
  columns,
  rows,
  onRowClick,
  className,
  title,
}) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 769);

  React.useEffect(() => {
    const handleWindowSize = (e: UIEvent) => {
      const w = e.target as Window;
      if (w.innerWidth <= 769) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  });

  const renderDesktopView = () => {
    return (
      <table className={cx(styles.mainTable, className)}>
        {/* <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.label}</th>
            ))}
          </tr>
        </thead>> */}
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} onClick={() => row}>
              {columns.map((column) => (
                <>
                  {column.showButton === true && (
                    <td key={row.id + column.field}>
                      <Button onClick={() => onRowClick(row)}>View</Button>
                    </td>
                  )}
                  {column.showButton !== true && (
                    <td key={row.id + column.field}>{row[column.field]}</td>
                  )}
                </>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const renderMobileView = () => {
    const mobileColumn = [
      {
        ...columns[0],
      },
    ];
    return (
      <table className={cx(styles.mainTable, styles.mobileTable)}>
        {rows.map((row) => (
          <thead key={row.id}>
            {mobileColumn.map((column) => (
              <tr key={row.id + column.field} onClick={() => onRowClick(row)}>
                {!column.hideLabelinMobile && <h3>{row[column.field]}</h3>}
              </tr>
            ))}
          </thead>
        ))}
      </table>
    );
  };

  return <>{isMobile ? renderMobileView() : renderDesktopView()}</>;
};

export default Table;
