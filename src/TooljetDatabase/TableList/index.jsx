import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-hot-toast";
import { isEmpty } from "lodash";
import { TooljetDatabaseContext } from "../index";
import { ListItem } from "../TableListItem";

const List = () => {
  const {
    organizationId,
    tables,
    searchParam,
    selectedTable,
    setTables,
    setSelectedTable,
  } = useContext(TooljetDatabaseContext);
  const [loading, setLoading] = useState(false);

  async function fetchTables() {
    setLoading(true);
    setLoading(false);
  }

  useEffect(() => {
    fetchTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let filteredTables = [...tables];

  if (!isEmpty(searchParam)) {
    filteredTables = tables.filter(({ table_name }) =>
      table_name.toLowerCase().includes(searchParam)
    );
  }

  return (
    <>
      <div className="subheader mb-2" data-cy="all-tables-subheader">
        All tables ({filteredTables.length})
      </div>
      <div className="list-group mb-3">
        {loading && <Skeleton count={3} height={22} />}
        {!loading &&
          filteredTables?.map(({ table_name }, index) => (
            <ListItem
              key={index}
              active={table_name === selectedTable}
              text={table_name}
              onDeleteCallback={fetchTables}
              onClick={() => {
                setSelectedTable(table_name);
              }}
            />
          ))}
      </div>
    </>
  );
};

export default List;
