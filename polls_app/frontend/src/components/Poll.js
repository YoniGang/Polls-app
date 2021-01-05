import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, ButtonGroup, ToggleButton, Badge} from 'react-bootstrap';

export default class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [
                { choice_text: 'Active', id: '1', votes: 0, question: 1},
                { choice_text: 'Radio', id: '2' , votes: 0, question: 1},
                { choice_text: 'Radio', id: '3' , votes: 0, question: 1},
            ],
            selectedRadioVal:0,
            qustionText: "Question",
            showResults:false

        }
    }

    componentDidMount() {
        this.fetchQuestion();
        this.fetchChoices();
      }

      fetchQuestion() {
        console.log('Fetching Question...')
        const id = this.props.match.params.id
        fetch('http://127.0.0.1:8000/api/question/' + id)
        .then(response => response.json())
        .then(data => 
            // console.log(data)
            this.setState({
                qustionText: data.question_text
            })
        )
      }

      fetchChoices() {
        console.log('Fetching Choices...')
        const id = this.props.match.params.id
        fetch('http://127.0.0.1:8000/api/choices/' + id)
        .then(response => response.json())
        .then(data => 
            // console.log(data)
            this.setState({
                choices:data
            })
        )
      }
    
      handleClickHome() {
        this.props.history.push('/');
      }

      getId() {
        return this.props.match.params.id
      }

      handleVote() {
        this.setState({showResults: true})
      }

      showVoteButton() {
          if (!this.state.showResults)
            return (
                <Button 
                    onClick={() => this.handleVote()} 
                    variant="primary" 
                    style={{marginTop:10}}>
                        Vote
                </Button>
            )
            return
      }

      showButtonsOrResults() {
        return (
            <ButtonGroup toggle vertical>
                {this.state.choices.map((choice, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant="outline-info"
                        name="radio"
                        value={choice.id}
                        checked={this.state.selectedRadioVal === choice.id}
                        onChange={(e) => this.setState({selectedRadioVal: e.currentTarget.id})}
                        disabled={this.state.showResults}
                        style={{marginBottom:10}}
                    >
                        {choice.choice_text}
                        {this.state.showResults && <div><Badge pill variant="info">{choice.votes}</Badge></div>}
                    </ToggleButton>
                ))}
                {this.showVoteButton()}
        </ButtonGroup>
          )
      }

      render() {
          return (
            <Container>
                <Row>
                    <Col className="App">
                        <h1>Polls App</h1>
                    </Col>
                    <Col> 
                        <Button onClick={() => this.handleClickHome()} variant="primary" style={{margin:10}}>Back</Button>
                    </Col>
                </Row>
                <Row>
                    {/* <Col></Col> */}
                    <Col>
                        <Card>
                            <Card.Header as="h5">Poll question</Card.Header>
                            <Card.Body>
                                <Card.Title>{this.state.qustionText}</Card.Title>
                                {this.showButtonsOrResults()}  
                            </Card.Body> 
                        </Card>
                    </Col>
                    {/* <Col></Col> */}
                </Row>
            </Container>
        );
      }
      
}