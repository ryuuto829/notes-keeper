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

export const EXAMPLE_DATA = {
  collection: {
    initial: {
      children: ["8yixpltx0", "1ozoqy1uj", "1s48us571"],
      level: 0
    },
    "1g6ljjmjm": {
      content: "_Declarative_",
      children: ["3kzo3qrxi", "2ieke28ly"],
      parent: "8yixpltx0",
      level: 2
    },
    "8yixpltx0": {
      content: "**React**",
      children: [
        "1g6ljjmjm",
        "22inm00z5",
        "2hgyjsbum",
        "83yt2c42r",
        "a4eqo30lm"
      ],
      parent: "initial",
      level: 1
    },
    "22inm00z5": {
      content: "_Component-Based_",
      children: ["6lpjb0qzn", "4sj2hhwzh"],
      parent: "8yixpltx0",
      level: 2
    },
    "3kzo3qrxi": {
      content:
        "_React_ makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
      children: null,
      parent: "1g6ljjmjm",
      level: 3
    },
    "6lpjb0qzn": {
      content:
        "Build encapsulated components that manage their own state, then compose them to make complex UIs.",
      children: null,
      parent: "22inm00z5",
      level: 2
    },
    "4sj2hhwzh": {
      content:
        "Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.",
      children: null,
      parent: "22inm00z5",
      level: 2
    },
    "2hgyjsbum": {
      content: "_Learn Once, Write Anywhere_",
      children: ["25gihf0l9", "1maeo88q7"],
      parent: "8yixpltx0",
      level: 2
    },
    "25gihf0l9": {
      content:
        "We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.",
      children: null,
      parent: "2hgyjsbum",
      level: 3
    },
    "1maeo88q7": {
      content:
        "React can also render on the server using Node and power mobile apps using React Native.",
      children: null,
      parent: "2hgyjsbum",
      level: 3
    },
    "83yt2c42r": {
      content:
        "![React image](https://frontendmasters.com/static-assets/learn/og-learning-path-react.jpg)",
      children: null,
      parent: "8yixpltx0",
      level: 2
    },
    a4eqo30lm: {
      content: "**React v17.0**",
      children: ["2d560af09"],
      parent: "8yixpltx0",
      level: 2
    },
    "1ozoqy1uj": {
      content: "**React 17 enables gradual React upgrades.**",
      children: ["15pxt6aqy"],
      parent: "initial",
      level: 1
    },
    "2d560af09": {
      content:
        "The React 17 release is unusual because it doesn’t add any new developer-facing features. Instead, this release is primarily focused on making it easier to upgrade React itself.",
      children: null,
      parent: "a4eqo30lm",
      level: 3
    },
    "15pxt6aqy": {
      content:
        "When you upgrade from React 15 to 16 (or, this time, from React 16 to 17), you would usually upgrade your whole app at once. This works well for many apps. But it can get increasingly challenging if the codebase was written more than a few years ago and isn’t actively maintained. And while it’s possible to use two versions of React on the page, until React 17 this has been fragile and caused problems with events.",
      children: ["54qgpn99e"],
      parent: "1ozoqy1uj",
      level: 2
    },
    "54qgpn99e": {
      content:
        "We’re fixing many of those problems with React 17. This means that when React 18 and the next future versions come out, you will now have more options. The first option will be to upgrade your whole app at once, like you might have done before. But you will also have an option to upgrade your app piece by piece. For example, you might decide to migrate most of your app to React 18, but keep some lazy-loaded dialog or a subroute on React 17.",
      children: ["1x2yccm9t"],
      parent: "15pxt6aqy",
      level: 3
    },
    "1x2yccm9t": {
      content:
        "This doesn’t mean you have to do gradual upgrades. For most apps, upgrading all at once is still the best solution. Loading two versions of React — even if one of them is loaded lazily on demand — is still not ideal. However, for larger apps that aren’t actively maintained, this option makes sense to consider, and React 17 lets those apps not get left behind.",
      children: null,
      parent: "54qgpn99e",
      level: 4
    },
    "1s48us571": {
      content: "**Changes to Event Delegation**",
      children: ["728kzn250", "32u9l2byt"],
      parent: "initial",
      level: 1
    },
    "728kzn250": {
      content:
        "To enable gradual updates, we’ve needed to make some changes to the React event system. React 17 is a major release because these changes are potentially breaking. You can check out our versioning FAQ to learn more about our commitment to stability.",
      children: null,
      parent: "1s48us571",
      level: 2
    },
    "32u9l2byt": {
      content: "",
      children: null,
      parent: "1s48us571",
      level: 2
    },
    "2ieke28ly": {
      content:
        "Declarative views make your code more predictable and easier to debug. ",
      children: null,
      parent: "1g6ljjmjm",
      level: 3
    }
  }
};

export const COLLECTION_DATA = {
  pageId1: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId2: {
    title: "Second page",
    wordCount: "25",
    updated: "01.22.2020",
    created: "01.01.2020"
  },
  pageId3: {
    title: "Some title here",
    wordCount: "4",
    updated: "21.02.2020",
    created: "01.31.2020"
  },
  pageId4: {
    title: "Meh",
    wordCount: "354",
    updated: "01.06.2020",
    created: "03.01.2020"
  },
  pageId5: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId6: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId7: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId8: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId9: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId10: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId11: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId12: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId13: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId14: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId15: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  },
  pageId16: {
    title: "Current approaches to knowledge management",
    wordCount: "254",
    updated: "01.02.2020",
    created: "01.01.2020"
  }
};

export default DOCUMENT_DATA;
