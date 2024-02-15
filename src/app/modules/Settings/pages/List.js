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
          dataField: "key",
          text: "Key",
          sort: true,
          sortCaret,
        },
        {
          dataField: "value",
          text: "Value",
          sort: true,
          sortCaret,
        },
      ]}
    />
  );
};
