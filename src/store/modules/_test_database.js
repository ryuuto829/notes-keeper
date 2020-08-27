export const DOCUMENT_DATA = {
  documentId: "id1",
  editable: null,
  title: "Current approaches to knowledge management",
  isShortcuted: false,
  createdAt: "",
  updatedAt: "",
  archivedAt: "",
  collection: {
    id1: {
      children: ["id2", "id3", "id7"],
      level: 0
    },
    id2: {
      content:
        "Many technologies for organizing **knowledge** outside of the brain have arisen in response to these limitations. [[Physical books]] and journals proliferated after the invention of the Gutenberg Press, and have since been partially supplanted by word processors, websites, blogs, forums, wikis, and software applications.",
      children: ["id4", "id5"],
      parent: "id1",
      level: 1
    },
    id3: {
      content:
        "While we are presented with a plethora of choices for organizing **knowledge**, almost every technology follows the same basic ‘file cabinet’ format.",
      children: null,
      parent: "id1",
      level: 1
    },
    id4: {
      content:
        "To access the information, _the user must remember_ where they stored the file, what they tagged it with, or use a search function to locate it. ![alt text](https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg)",
      children: null,
      parent: "id2",
      level: 2
    },
    id5: {
      content:
        "To access the information, _the user must remember_ where they stored the file, what they tagged it with, or use a search [title of link](https://www.example.com) function to locate it.",
      children: ["id6"],
      parent: "id2",
      level: 2
    },
    id6: {
      content:
        "To access the information, the [[user]] must remember where they stored the file, what they tagged it with, or use a **search function** to locate it.",
      children: null,
      parent: "id5",
      level: 3
    },
    id7: {
      content: "> This is blockquote text",
      children: null,
      parent: "id1",
      level: 1
    }
  }
};

export default DOCUMENT_DATA;
