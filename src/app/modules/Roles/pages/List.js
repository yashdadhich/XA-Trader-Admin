import React from "react";
import * as actions from "../_redux/actions";
import * as uiHelpers from "./ItemsUIHelpers";
import { ItemsList } from "../../../../_component/list/ItemsList";
import { sortCaret } from "../../../../_metronic/_helpers";

export default (props) => {
  return (
    <ItemsList
      {...props}
      actions={actions}
      uiHelpers={uiHelpers}
      columns={[
        {
          dataField: "title",
          text: "Title",
          sort: true,
          sortCaret,
        },
        {
          dataField: "generateCode",
          text: "Generate Code",
          sort: true,
          sortCaret,
        },
        {
          dataField: "status",
          text: "Status",
          sort: true,
          sortCaret,
        },
      ]}
    />
  );
};
