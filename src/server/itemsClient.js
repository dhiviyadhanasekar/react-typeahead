import { itemsMapper } from "./mapper";

export const fetchApiItems = async ({ query }) => {
  let response;
  // return [
  //   { value: "Orange", id: 1 },
  //   { value: "Apple", id: 2 },
  //   { value: "Kiwi", id: 3 },
  //   { value: "Banana", id: 4 }
  // ];
  try {
    response = await window.fetch(
      `https://api.github.com/search/repositories?q=${query}`
    );
    response = await response.json();
  } catch (e) {
    console.error(e);
  }
  return itemsMapper(response);
};
