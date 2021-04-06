export function itemsMapper(response = {}) {
  const { items = [] } = response;
  const result = items.map(({ full_name = "", id }) => ({
    value: full_name,
    id
  }));
  return result;
}
