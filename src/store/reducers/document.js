const initialState = {
  listByID: {
    id1: {
      text: 'Managing your time and motivation 1',
      hasChildren: true,
      children: ['id3', 'id4', 'id5']
    },
    id2: {
      text: 'Managing your time and motivation 2',
      hasChildren: true,
      children: ['id9', 'id10', 'id11']
    },
    id3: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
    id4: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
    id5: {
      text: 'Managing your time and motivation Nested',
      hasChildren: true,
      children: ['id6', 'id7', 'id8']
    },
    id6: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
    id7: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
    id8: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
    id9: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
    id10: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
    id11: {
      text: 'Nested text',
      hasChildren: false,
      children: null
    },
  },
  headIDList: ['id1', 'id2']
};

const document = (state = initialState, action) => {
  return state;
};

export default document;