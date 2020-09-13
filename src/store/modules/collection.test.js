import collection, {
  addSelection,
  removeSelection,
  addSelectedAll,
  removeSelectedAll
} from "./collection";

describe("collection reducer", () => {
  test("should add id to selected", () => {
    expect(
      collection(
        { selected: [] },
        { type: addSelection.type, payload: { id: "id" } }
      )
    ).toEqual({ selected: ["id"], selectAll: true });
  });

  test("should remove id from selected", () => {
    expect(
      collection(
        { selected: ["1", "2", "3"] },
        { type: removeSelection.type, payload: { id: "2" } }
      )
    ).toEqual({ selected: ["1", "3"], selectAll: true });
  });

  test("should return empty array when removing last item", () => {
    expect(
      collection(
        { selected: ["1"] },
        { type: removeSelection.type, payload: { id: "1" } }
      )
    ).toEqual({ selected: [], selectAll: false });
  });

  test("should select all pages", () => {
    expect(
      collection(
        { pages: { "1": {}, "2": {} }, selected: [] },
        { type: addSelectedAll.type }
      )
    ).toEqual({
      pages: { "1": {}, "2": {} },
      selected: ["1", "2"],
      selectAll: true
    });
  });

  test("should remove all pages from selected", () => {
    expect(
      collection(
        { pages: { "1": {}, "2": {} }, selected: [] },
        { type: removeSelectedAll.type }
      )
    ).toEqual({
      pages: { "1": {}, "2": {} },
      selected: [],
      selectAll: false
    });
  });
});
