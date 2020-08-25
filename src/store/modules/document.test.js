import document, {
  removeEditable,
  setEditable,
  updateContent,
  addItem,
  moveUp,
  moveDown,
  mergeItem,
  splitItem
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

  test("should add a new item as child, give it focus", () => {
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

  test("should add a new item as sibling, give it focus", () => {
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

  test("should move item up if lvl > 1, give it focus", () => {
    expect(
      document(
        {
          collection: {
            id1: {
              children: ["id2"],
              level: 0
            },
            id2: {
              parent: "id1",
              children: ["id4"],
              level: 1
            },
            id4: {
              parent: "id2",
              children: null,
              level: 2
            }
          }
        },
        { type: moveUp.type, payload: { currentId: "id4" } }
      )
    ).toEqual({
      editable: "id4",
      collection: {
        id1: {
          children: ["id2", "id4"],
          level: 0
        },
        id2: {
          parent: "id1",
          children: null,
          level: 1
        },
        id4: {
          parent: "id1",
          children: null,
          level: 1
        }
      }
    });
  });

  test("should move item down if appended as a sibling", () => {
    expect(
      document(
        {
          editable: "id4",
          collection: {
            id1: {
              children: ["id2", "id4"],
              level: 0
            },
            id2: {
              parent: "id1",
              children: null,
              level: 1
            },
            id4: {
              parent: "id1",
              children: null,
              level: 1
            }
          }
        },
        { type: moveDown.type, payload: { currentId: "id4" } }
      )
    ).toEqual({
      editable: "id4",
      collection: {
        id1: {
          children: ["id2"],
          level: 0
        },
        id2: {
          parent: "id1",
          children: ["id4"],
          level: 1
        },
        id4: {
          parent: "id2",
          children: null,
          level: 2
        }
      }
    });
  });

  test("should don't move down if it's first child", () => {
    const initialState = {
      collection: {
        id1: {
          children: ["id4"],
          level: 0
        },
        id4: {
          parent: "id1",
          children: null,
          level: 1
        }
      }
    };
    expect(
      document(initialState, {
        type: moveDown.type,
        payload: { currentId: "id4" }
      })
    ).toEqual(initialState);
  });

  test("shouldn't merge item with own children", () => {
    const initialState = {
      collection: {
        id2: {
          children: ["id4"],
          level: 1
        },
        id4: {
          parent: "id2",
          children: ["id6"],
          level: 2
        }
      }
    };
    expect(
      document(initialState, {
        type: mergeItem.type,
        payload: { currentId: "id4" }
      })
    ).toEqual(initialState);
  });

  test("should merge two siblings and append children from it", () => {
    expect(
      document(
        {
          collection: {
            id2: {
              children: ["id3", "id4"],
              level: 1
            },
            id3: {
              content: "Parent text",
              children: null,
              level: 2
            },
            id4: {
              content: " Child text",
              parent: "id2",
              children: ["id6"],
              level: 2
            },
            id6: {
              parent: "id4",
              children: ["id7"],
              level: 3
            }
          }
        },
        { type: mergeItem.type, payload: { currentId: "id4" } }
      )
    ).toEqual({
      collection: {
        id2: {
          children: ["id3"],
          level: 1
        },
        id3: {
          content: "Parent text Child text",
          children: ["id6"],
          level: 2
        },
        id6: {
          parent: "id3",
          children: ["id7"],
          level: 3
        }
      }
    });
  });

  test("should merge sibling with last node of sibling's children", () => {
    expect(
      document(
        {
          collection: {
            id2: {
              children: ["id3", "id4"],
              level: 1
            },
            id3: {
              children: ["id8", "id9", "id10"],
              parent: "id2",
              level: 2
            },
            id10: {
              children: null,
              content: "Some text"
            },
            id4: {
              content: " Another text",
              children: ["id6"],
              parent: "id2",
              level: 2
            }
          }
        },
        { type: mergeItem.type, payload: { currentId: "id4" } }
      )
    ).toEqual({
      editable: "id10",
      collection: {
        id2: {
          children: ["id3"],
          level: 1
        },
        id3: {
          children: ["id8", "id9", "id10"],
          parent: "id2",
          level: 2
        },
        id10: {
          children: null,
          content: "Some text Another text"
        }
      }
    });
  });

  test("should merge first child without own children with parent", () => {
    expect(
      document(
        {
          collection: {
            id2: {
              content: "Parent text",
              children: ["id4", "id3", "id5"],
              level: 1
            },
            id4: {
              content: " Child text",
              children: null,
              parent: "id2",
              level: 2
            }
          }
        },
        { type: mergeItem.type, payload: { currentId: "id4" } }
      )
    ).toEqual({
      editable: "id2",
      collection: {
        id2: {
          content: "Parent text Child text",
          children: ["id3", "id5"],
          level: 1
        }
      }
    });
  });

  test("should merge first child without own children with parent", () => {
    expect(
      document(
        {
          collection: {
            id1: {
              children: ["id2", "id3"],
              level: 0
            },
            id2: {
              content: "Some long text that need to be splited",
              children: ["id4", "id8", "id9"],
              parent: "id1",
              level: 1
            }
          }
        },
        {
          type: splitItem.type,
          payload: { currentId: "id2", splitAt: 11, newItemId: "id10" }
        }
      )
    ).toEqual({
      collection: {
        id1: {
          children: ["id10", "id2", "id3"],
          level: 0
        },
        id10: {
          content: "Some long t",
          children: null,
          parent: "id1",
          level: 1
        },
        id2: {
          content: "ext that need to be splited",
          children: ["id4", "id8", "id9"],
          parent: "id1",
          level: 1
        }
      }
    });
  });
});
