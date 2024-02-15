import axios from "axios";

export const resource = "/users";

// CREATE =>  POST: add a new item to the server
export function createItem(data) {
  return axios.post(resource, data);
}

// CLONE
export function cloneItem(id) {
  return axios.get(`${resource}/${id}/clone`);
}

// READ
export function getAllItems() {
  return axios.get(resource);
}

export function getItemById(id) {
  return axios.get(`${resource}/${id}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findItems(queryParams) {
  const filter = [];
  const limit = queryParams.pageSize ? queryParams.pageSize : 10;

  filter.push(
    `filter[skip]=${
      queryParams.pageNumber > 1 ? (queryParams.pageNumber - 1) * limit : 0
    }`
  );

  filter.push(`filter[limit]=${limit}`);

  if (queryParams.sortField && queryParams.sortField !== "") {
    filter.push(
      `filter[order]=${
        queryParams.sortField
      } ${queryParams.sortOrder.toUpperCase()}`
    );
  }

  Object.entries(queryParams.filter).forEach((data, index) => {
    filter.push(
      `filter[where][or][${index}][${data[0]}][regexp]=/^.*${data[1]}.*$/i`
    );
  });

  const filterText = filter.join("&");

  return axios.get(`${resource}${filterText !== "" ? "?" : ""}${filterText}`);
}

export function findSelectItems(titleField) {
  if (Array.isArray(titleField)) {
    return axios.get(
      `${resource}?filter={"fields":${JSON.stringify(["id", ...titleField])}}`
    );
  }

  return axios.get(`${resource}?filter={"fields":["id", "${titleField}"]}`);
}

export function fetchAgents() {
  return axios.get("/agents");
}

// UPDATE => PATCH: update the data on the server
export function updateItem(data) {
  return axios.patch(`${resource}/${data.id}`, data);
}

// UPDATE Status
export function updateStatusForItems(ids, status) {
  return axios.patch(
    `${resource}?where={"id":{"inq":${JSON.stringify(ids)}}}`,
    {
      ids,
      status,
    }
  );
}

// DELETE => delete the item from the server
export function deleteItem(id) {
  return axios.delete(`${resource}/${id}`);
}

// DELETE Items by ids
export function deleteItems(ids) {
  return axios.post(`${resource}/delete`, { ids });
}
