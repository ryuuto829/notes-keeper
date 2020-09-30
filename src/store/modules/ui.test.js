import ui, { addShortcut, removeShortcut, updateShortcuts } from "./ui";

const EXAMPLE_PAGE_SHORTCUT = { id: "id1", url: "/page/id1", title: "t" };

describe("ui reducer", () => {
  test("should add shortcut", () => {
    expect(
      ui(
        { shortcuts: [] },
        {
          type: addShortcut.type,
          payload: EXAMPLE_PAGE_SHORTCUT
        }
      )
    ).toEqual({ shortcuts: [EXAMPLE_PAGE_SHORTCUT] });
  });

  test("should add shortcut to the end", () => {
    expect(
      ui(
        { shortcuts: ["s", "s"] },
        {
          type: addShortcut.type,
          payload: EXAMPLE_PAGE_SHORTCUT
        }
      )
    ).toEqual({ shortcuts: ["s", "s", EXAMPLE_PAGE_SHORTCUT] });
  });

  test("should remove shortcut", () => {
    expect(
      ui(
        { shortcuts: ["id1", "id2"] },
        {
          type: removeShortcut.type,
          payload: { id: "id1" }
        }
      )
    ).toEqual({ shortcuts: ["id2"] });
  });

  test("should leave empty array when all shortcuts deleted", () => {
    expect(
      ui(
        { shortcuts: ["id1"] },
        {
          type: removeShortcut.type,
          payload: { id: "id1" }
        }
      )
    ).toEqual({ shortcuts: [] });
  });

  test("should update list of shortcuts", () => {
    expect(
      ui(
        { shortcuts: ["id1", "id2"] },
        {
          type: updateShortcuts.type,
          payload: { list: ["id4", "id3"] }
        }
      )
    ).toEqual({ shortcuts: ["id4", "id3"] });
  });
});
