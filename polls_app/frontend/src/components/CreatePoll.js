import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, Form, ButtonGroup, Alert} from 'react-bootstrap';

export default class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionVal:"",
            choicesValArr: ["","",""],
            showError: false,
            errorMessage: ""
        }
    }
    
      handleClickHome() {
        this.props.history.push('/');
      }

      handleChoiceChange(e, idx) { 
        let choices = [...this.state.choicesValArr]
        choices[idx] = e.target.value
        this.setState({choicesValArr: choices})
      }

      handleAddChoice(push) {
        let choices = [...this.state.choicesValArr]
        if (push)
            choices.push("")
        else if (choices.length > 1)
            choices.pop()
        this.setState({choicesValArr: choices})
      }

      handleSubmit() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question_text: this.state.questionVal,
                choices: this.state.choicesValArr,
            }),
          };
          fetch('http://127.0.0.1:8000/api/create_poll', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data['Bad Request']) {
                    this.setState({errorMessage: data['Bad Request']})
                    this.setState({showError: true})
                }
                else
                    this.props.history.push("/poll/" + data.id)
                // console.log(data)
                });
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
                            <Card.Header as="h5">Create poll</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Alert 
                                        show={this.state.showError} 
                                        onClose={() => this.setState({showError: false})} 
                                        variant="danger" 
                                        dismissible
                                    >
                                        <Alert.Heading>Error!</Alert.Heading>
                                        <p>{this.state.errorMessage}</p>
                                    </Alert>
                                    <Form.Group>
                                        <Form.Control 
                                            placeholder="Question"
                                            as="textarea" 
                                            rows={3}
                                            value={this.state.questionVal}
                                            onChange={e => this.setState({ questionVal: e.target.value})}
                                            type="text"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        {this.state.choicesValArr.map((choiceText, idx) => (
                                             <Form.Control
                                             key={idx}
                                             placeholder="Enter a choice"
                                             value={this.state.choicesValArr[idx]}
                                             onChange={e => this.handleChoiceChange(e, idx)}
                                             type="text"
                                             style={{marginTop:10}}
                                         />
                                        ))}     
                                    </Form.Group>
                                    <Container>
                                        <Row>
                                            <ButtonGroup>
                                                <Button onClick={() => this.handleAddChoice(true)} variant="light" style={{marginRight:10}}>
                                                    + Add choice
                                                </Button>
                                                <Button onClick={() => this.handleAddChoice(false)} variant="light">
                                                    - Remove choice
                                                </Button>
                                            </ButtonGroup>
                                        </Row>
                                        <Row style={{marginTop:10}}>
                                            <Button variant="primary" onClick={() => this.handleSubmit()}>
                                                    Create
                                            </Button>
                                        </Row>
                                     </Container>
                                    
                                </Form>
                            </Card.Body> 
                        </Card>
                    </Col>
                    {/* <Col></Col> */}
                </Row>
            </Container>
        );
      }
      
}