import React, { Component } from 'react';
import { 
    Button, 
    Card, 
    Container, 
    Row, 
    Col, 
    ButtonGroup,
     ToggleButton, 
     Badge, 
     Alert, 
     ProgressBar, 
     ListGroup} from 'react-bootstrap';

export default class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: [
                // { choice_text: 'Active', id: '1', votes: 0, question: 1},
                // { choice_text: 'Radio', id: '2' , votes: 0, question: 1},
                // { choice_text: 'Radio', id: '3' , votes: 0, question: 1},
            ],
            selectedChoiceId:0,
            qustionText: "Question",
            showResults:false,
            showError: false,
            errorMessage: "",
            internal_ip:""

        }
    }

    componentDidMount() {
        this.fetchQuestion();
      }

      internalIpVoteCheck(){
        const id = this.props.match.params.id
        fetch('http://127.0.0.1:8000/api/get_ip')
        .then(response => response.json())
        .then(internal_ip => {
            fetch('http://127.0.0.1:8000/api/votes/' + id)
            .then(response => response.json())
            .then(vdata => {
                    // If my ip already voted
                   if (vdata.find((v) => v.ip_address === internal_ip.ip)) {
                       this.setState({showResults: true})
                   }
                })
        })
      }

      fetchQuestion() {
        console.log('Fetching Question...')
        const id = this.props.match.params.id
        fetch('http://127.0.0.1:8000/api/question/' + id)
        .then(response => response.json())
        .then(data => {
            if (data.detail)
                this.props.history.push('/');
            else {
                this.setState({
                    qustionText: data.question_text
                })
                this.fetchChoices();
                this.internalIpVoteCheck();
            }
        })
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
            // this.props.history.push('/')
        )
      }
    
      handleClickHome() {
        this.props.history.push('/');
      }

      getId() {
        return this.props.match.params.id
      }

      sumVotes() {
          let sum = 0
          this.state.choices.forEach((c) => sum += c.votes)
          return sum
      }

      handleVote() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                choice: this.state.selectedChoiceId
            }),
          };

        const qid = this.props.match.params.id
        // console.log({"choice":this.state.selectedChoiceId})
        fetch('http://127.0.0.1:8000/api/vote/' + qid, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (data['Bad Request']) {
                
                this.setState({errorMessage: data['Bad Request']})
                this.setState({showError: true})
            }
            else
                this.fetchChoices()
                this.setState({showResults: true})
            });
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

      showButtons() {
        return (
            <div>
                <ButtonGroup toggle vertical>
                    {this.state.choices.map((choice, idx) => (
                        <ToggleButton
                            key={idx}
                            type="radio"
                            variant="outline-info"
                            name="radio"
                            value={choice.id}
                            checked={this.state.selectedChoiceId === choice.id}
                            onChange={(e) => this.setState({selectedChoiceId: choice.id})}
                            disabled={this.state.showResults}
                            style={{marginBottom:10}}
                        >
                            {choice.choice_text}
                            {this.state.showResults && <div><Badge pill variant="info">{choice.votes}</Badge></div>}
                        </ToggleButton>
                    ))}
                    {this.showVoteButton()}
            </ButtonGroup>
        </div>
          )
      }

      showResults() {
        return (
            <div>
                <ListGroup variant="flush">
                    {this.state.choices.map((choice, idx) => (
                        <ListGroup.Item
                            key={idx}
                        >
                            {choice.choice_text}
                            {<ProgressBar 
                                variant="danger" 
                                now={(choice.votes/this.sumVotes())*100} 
                                label={choice.votes}
                             />}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
        </div>
          )
      }

      showButtonsOrResults() {
        if (this.state.showResults) {
            return this.showResults()
        }

        return this.showButtons()

        
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
                            onClick={() => this.handleClickHome()}
                            variant="primary" 
                        >
                            Back
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {/* <Col></Col> */}
                    <Col>
                        <Card>
                            <Card.Header as="h5">Poll question</Card.Header>
                            <Card.Body className="text-center">
                                <Alert 
                                        show={this.state.showError} 
                                        onClose={() => this.setState({showError: false})} 
                                        variant="danger" 
                                        dismissible
                                    >
                                        <Alert.Heading>Error!</Alert.Heading>
                                        <p>{this.state.errorMessage}</p>
                                </Alert>
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