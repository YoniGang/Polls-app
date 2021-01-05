import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';

export default class Polls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls:[ {
                "id": 3,
                "question_text": "How do you do?",
                "pub_date": "2021-01-04T13:26:00Z"
            },
            {
                "id": 11,
                "question_text": "are you good?",
                "pub_date": "2021-01-04T15:39:09.362215Z"
            }
        ]
        }
      }
      handleClick(pollId) {
        this.props.history.push('/poll/' + pollId);
      }

      handleClickCreate () {
        this.props.history.push("/create")
      }

      getId () {
        return this.props.match.params.id
      }

      render() {
          return (
            <Container>
                <Row>
                    <Col className="App">
                        <h1>Polls App</h1>
                    </Col>
                    <Col> 
                        <Button 
                            onClick={() => this.handleClickCreate()}
                            variant="primary" 
                             style={{margin:10}}>
                                Create new poll
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {/* <Col></Col> */}
                    <Col>
                        {/* <Card.Header as="h5">Featured</Card.Header> */}
                        {this.state.polls.map((poll, idx) => (
                            <Card key={idx}>
                                <Card.Body>
                                    <Card.Title>{poll.question_text}</Card.Title>
                                    <Button 
                                        onClick={() => this.handleClick(poll.id)} 
                                        variant="primary">
                                            See Poll
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}     
                    </Col>
                    {/* <Col></Col> */}
                </Row>
            </Container>
        );
      }
      
}