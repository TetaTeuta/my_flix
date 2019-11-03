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
            <Card className="mb-1 mb-sm-2" style={{ width: '16rem', marginLeft: '30%' }}>
                <Card.Body>
                    <Card.Title className="director-name">{director.Name}</Card.Title>
                    <Card.Text>
                        Biography: <br />
                        <br />
                        {director.Bio}
                        <br />
                        <br />
                        Birth Year:  {director.Birth}<br />
                        Death year: {director.Death}
                    </Card.Text>
                    <div className="text-center">
                        <Link to={`/`}>
                            <Button className="back-button" variant="info">Back</Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        );
    }

}

DirectorView.propTypes = {
    // will add later
};
