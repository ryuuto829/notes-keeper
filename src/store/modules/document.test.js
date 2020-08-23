import document, {
  removeEditable,
  setEditable,
  updateContent,
  addItem
} from "./document";

describe("document reducer", () => {
  test("should remove editable id", () => {
    expect(
      document({ editable: "id2" }, { type: removeEditable.type })
    ).toEqual({
      editable: null
    });
  });

  test("should set editable to defined id", () => {
    expect(
      document(
        { editable: "id2" },
        { type: setEditable.type, payload: { id: "id4" } }
      )
    ).toEqual({
      editable: "id4"
    });
  });

  test("should change text content of given id", () => {
    expect(
      document(
        {
          collection: {
            id4: {
              content: "Old text"
            }
          }
        },
        {
          type: updateContent.type,
          payload: { currentId: "id4", text: "New text" }
        }
      )
    ).toEqual({
      collection: {
        id4: {
          content: "New text"
        }
      }
    });
  });

  test("should create a new item, give it focus when created as a child", () => {
    expect(
      document(
        {
          collection: {
            id2: {
              children: ["id4", "id5"],
              level: 1
            }
          }
        },
        { type: addItem.type, payload: { currentId: "id2", newItemId: "id0" } }
      )
    ).toEqual({
      editable: "id0",
      collection: {
        id2: {
          children: ["id0", "id4", "id5"],
          level: 1
        },
        id0: {
          level: 2,
          content: "",
          children: null,
          parent: "id2"
        }
      }
    });
  });

  test("should create a new item, give it focus when created as a child", () => {
    expect(
      document(
        {
          collection: {
            id1: {
              children: ["id2"]
            },
            id2: {
              parent: "id1",
              children: null,
              level: 1
            }
          }
        },
        { type: addItem.type, payload: { currentId: "id2", newItemId: "id0" } }
      )
    ).toEqual({
      editable: "id0",
      collection: {
        id1: {
          children: ["id2", "id0"]
        },
        id2: {
          parent: "id1",
          children: null,
          level: 1
        },
        id0: {
          level: 1,
          content: "",
          children: null,
          parent: "id1"
        }
      }
    });
  });
});
