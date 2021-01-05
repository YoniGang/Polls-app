import React, { Component } from 'react';
import { Button, Card, Container, Row, Col, ButtonGroup, ToggleButton, Badge} from 'react-bootstrap';

export default class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radios: [
                { name: 'Active', value: '1', votes: 0},
                { name: 'Radio', value: '2' , votes: 0},
                { name: 'Radio', value: '3' , votes: 0},
            ],
            selectedRadioVal:0,
            showResults:false

        }
    }
    
      handleClickHome() {
        this.props.history.push('/');
      }

      getId () {
        return this.props.match.params.id
      }

      showResults = (radio) => {
          if (this.state.showResults) {
              return (
                <Badge variant="dark">{radio.votes}</Badge>
              )
          }
          return
      }

      showButtonsOrResults () {
        return (
            <ButtonGroup toggle vertical>
                {this.state.radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant="Light"
                        name="radio"
                        value={radio.value}
                        checked={this.state.selectedRadioVal === radio.value}
                        onChange={(e) => this.setState({selectedRadioVal: e.currentTarget.value})}
                        disabled={this.state.showResults}
                    >
                        {radio.name}
                        {this.state.showResults && <div><Badge variant="dark">{radio.votes}</Badge></div>}
                    </ToggleButton>
                ))}
                <Button disabled={this.state.showResults} onClick={() => this.handleClickHome()} variant="primary" style={{marginTop:10}}>Vote</Button>
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
                                <Card.Title>Polls question</Card.Title>
                                {/* <ButtonGroup toggle vertical>
                                    {this.state.radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            type="radio"
                                            variant="Light"
                                            name="radio"
                                            value={radio.value}
                                            checked={this.state.selectedRadioVal === radio.value}
                                            onChange={(e) => this.setState({selectedRadioVal: e.currentTarget.value})}
                                        >
                                            {radio.name}
                                        </ToggleButton>
                                    ))}
                                    <Button onClick={() => this.handleClickHome()} variant="primary" style={{marginTop:10}}>Vote</Button>
                                </ButtonGroup> */}
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