import React from 'react';
import styled from 'styled-components';

const Collection = () => {
  return (
    <div>
      <h1>Collection</h1>
      <table>
        <tr>
          <th>Title</th>
          <th>Word Count</th>
          <th>Updated</th>
          <th>Created</th>
        </tr>
        <tr>
          <td>My First Page</td>
          <td>0</td>
          <td>29.07.20</td>
          <td>30.07.20</td>
        </tr>
      </table>
    </div>
  );
};

export default Collection;
