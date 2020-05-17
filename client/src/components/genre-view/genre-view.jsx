import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';


import './genre-view.scss';

/**
 * Genre information view - renders the genre description and a list of movies of this genre that
 * are available in the database.
 * @function GenreView
 * @param {string} props - genre, movies
 * @returns {GenreView}
 */

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <Card className="mb-1 mb-sm-2" style={{ maxHeight: '26rem' }}>
        <Card.Body>
          <Card.Title className="genre-name">{genre.Name}</Card.Title>
          <Card.Text className="genre-text">
            <br />
            {genre.Description}
            <Link to={`/`}>
              <br />
              <Button className="btn btn-dark" style={{ marginTop: '2rem' }} >Back</Button>
            </Link>
          </Card.Text>

        </Card.Body>
      </Card>
    );
  }

}

GenreView.propTypes = {
  // will add later
};
