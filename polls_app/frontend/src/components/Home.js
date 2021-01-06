import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button, Card, Container, Row, Col} from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import Container from 'react-bootstrap/Container';


export default class Polls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls:[]
        }
      }

      componentDidMount() {
        this.fetchPolls()
      }

      fetchPolls() {
        console.log('Fetching...')

        fetch('http://127.0.0.1:8000/api/questions')
        .then(response => response.json())
        .then(data => 
            this.setState({
                polls:data
            })
        )
      }

      handleClick(pollId) {
        this.props.history.push('/poll/' + pollId);
      }

      handleClickCreate () {
        this.props.history.push("/create")
      }

      handelClickDelete(pollId) {
        console.log('Deleting...')

        fetch('http://127.0.0.1:8000/api/delete_poll/' + pollId, {method: "DELETE"})
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.fetchPolls()
        })
      }

      render() {
          return (
            <Container>
                <Row style={{margin:10}}>
                    <Col className="App">
                        <h2>Polls App</h2>
                    </Col>
                    <Col> 
                        <Button 
                            onClick={() => this.handleClickCreate()}
                            variant="primary" 
                        >
                                Create new poll
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {/* <Col></Col> */}
                    <Col>
                        {/* <Card.Header as="h5">Featured</Card.Header> */}
                        {this.state.polls.map((poll, idx) => (
                            <Card key={idx} className="text-center" style={{marginTop:10}}>
                                <Card.Body>
                                    <Card.Title>{poll.question_text}</Card.Title>
                                    <Button 
                                        onClick={() => this.handleClick(poll.id)} 
                                        variant="primary">
                                            See Poll
                                    </Button>
                                    <Button 
                                        onClick={() => this.handelClickDelete(poll.id)} 
                                        variant="danger"
                                        style={{marginLeft:10}}>
                                            Delete
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