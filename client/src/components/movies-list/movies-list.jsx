import React from 'react';
import { connect } from 'react-redux';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <div className="movies-list">
        <Col md={4} lg={4} style={{ margin: '2rem' }}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        <Container>
            <Row>
                {filteredMovies.map(m =>
                    <div >
                        <MovieCard key={m._id} movie={m} />
                    </div>
                )}
            </Row>
        </Container>
    </div >;
}

export default connect(mapStateToProps)(MoviesList);