import collection, {
  addSelection,
  removeSelection,
  addSelectedAll,
  removeSelectedAll,
  updateList,
  deleteDocuments
} from "./collection";

const EXAMPLE_DATA = {
  id0: { title: "s", wordCount: 0, updated: "t", created: "t" },
  id1: { title: "s", wordCount: 0, updated: "t", created: "t" },
  id2: { title: "s", wordCount: 0, updated: "t", created: "t" }
};

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
        { selected: ["id1", "id2", "id3"] },
        { type: removeSelection.type, payload: { id: "id2" } }
      )
    ).toEqual({ selected: ["id1", "id3"], selectAll: true });
  });

  test("should return empty array when removing last item", () => {
    expect(
      collection(
        { selected: ["id1"] },
        { type: removeSelection.type, payload: { id: "id1" } }
      )
    ).toEqual({ selected: [], selectAll: false });
  });

  test("should select all pages", () => {
    expect(
      collection(
        { pages: EXAMPLE_DATA, selected: [] },
        { type: addSelectedAll.type }
      )
    ).toEqual({
      pages: EXAMPLE_DATA,
      selected: ["id0", "id1", "id2"],
      selectAll: true
    });
  });

  test("should remove all pages from selected", () => {
    expect(
      collection(
        { pages: EXAMPLE_DATA, selected: ["id0", "id3"] },
        { type: removeSelectedAll.type }
      )
    ).toEqual({
      pages: EXAMPLE_DATA,
      selected: [],
      selectAll: false
    });
  });

  test("should update list of docs", () => {
    expect(
      collection(
        { pages: null, selected: [], selectAll: false },
        { type: updateList.type, payload: { list: EXAMPLE_DATA } }
      )
    ).toEqual({
      pages: EXAMPLE_DATA,
      selected: [],
      selectAll: false
    });
  });

  test("should remove list of selected documents", () => {
    expect(
      collection(
        {
          pages: EXAMPLE_DATA,
          selected: ["id1", "id2"],
          selectAll: false
        },
        { type: deleteDocuments.type }
      )
    ).toEqual({
      pages: { id0: { title: "s", wordCount: 0, updated: "t", created: "t" } },
      selected: [],
      selectAll: false
    });
  });
});
