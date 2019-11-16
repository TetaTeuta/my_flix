import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { director } = this.props;

        if (!director) return null;

        return (
            <Card className="mb-1 mb-sm-2" style={{ maxHeight: '26rem' }}>
                <Card.Body>
                    <Card.Title className="director-name">{director.Name}</Card.Title>
                    <Card.Text className="director-bio">
                        Biography: <br />
                        <br />
                        {director.Bio}
                        <br />
                        <br />
                        Birth Year:  {director.Birth}<br />
                        Death year: {director.Death}
                        <br />
                        <br />
                        <Link to={`/`}>
                            <Button className="back-button" style={{ marginTop: '2rem' }}>Back</Button>
                        </Link>
                    </Card.Text>

                </Card.Body>
            </Card>
        );
    }

}

DirectorView.propTypes = {
    // will add later
};
