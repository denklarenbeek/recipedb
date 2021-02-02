import React, { Fragment } from 'react';

import './SearchEngine.css';

const SearchEngine = () => {
  return (
    <div className="search_engine">
      <i className="far fa-search"></i>
      <form action="/">
        <div className="search_input">
          <input type="text" placeholder="Wat eet jij vandaag?" />
        </div>
      </form>
    </div>
  );
};

export default SearchEngine;
