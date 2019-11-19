import React from 'react';
import { connect } from 'react-redux';

// import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './movies-list.scss'

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
    }

    if (!movies) return <div className="main-view" />;

    return <div className="movies-list">
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        <Container>
            <Row>
                {filteredMovies.map(m =>
                    <Col key={m._id} xs={12} sm={6} md={4} lg={4}>
                        <MovieCard key={m._id} movie={m} />
                    </Col>
                )}
            </Row>
        </Container>
    </div>;
}
export default connect(mapStateToProps)(MoviesList);