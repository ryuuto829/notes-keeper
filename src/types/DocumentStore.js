// @flow
export type DocumentStore = {
    documentId: ?string,
    editable: ?string,
    title: ?string,
    isShortcuted: boolean,
    createdAt: ?string,
    updatedAt: ?string,
    archivedAt: ?string,
    collection: {}
};
