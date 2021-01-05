import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, Form, ButtonGroup} from 'react-bootstrap';

export default class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionVal:"",
            choicesValArr: ["","",""]
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
          console.log(this.state.choicesValArr)
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
                            <Card.Header as="h5">Create poll</Card.Header>
                            <Card.Body>
                                <Form onSubmit={() => this.handleSubmit()}>
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
                                            <Button variant="primary" type="submit">
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