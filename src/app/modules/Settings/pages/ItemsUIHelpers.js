export const PageName = "Setting";
export const PageNameKey = "SETTING";
export const StateName = "settings";
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "20", value: 20 },
  { text: "50", value: 50 },
  { text: "100", value: 100 },
];
export const initialFilter = {
  filter: {},
  sortOrder: "asc", // asc||desc
  sortField: "",
  pageNumber: 1,
  pageSize: 10,
};
