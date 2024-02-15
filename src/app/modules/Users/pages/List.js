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
      showAddButton={false}
      columns={[
        {
          dataField: "firstName",
          text: "First Name",
          sort: true,
          sortCaret,
        },
        {
          dataField: "lastName",
          text: "Last Name",
          sort: true,
          sortCaret,
        },
        {
          dataField: "companyName",
          text: "Company Name",
          sort: true,
          sortCaret,
        },
        {
          dataField: "role.title",
          text: "Role",
          sort: true,
          sortCaret,
        },
        {
          dataField: "code",
          text: "Code",
          sort: true,
          sortCaret,
        },
      ]}
    />
  );
};
