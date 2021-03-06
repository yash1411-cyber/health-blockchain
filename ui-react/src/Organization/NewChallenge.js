import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { Breadcrumb, BreadcrumbItem, Button, FormGroup, SelectItem, Select, TextInput, TextArea } from 'carbon-components-react';
import OrgLayout from './OrgLayout';
import './NewChallenge.css';
import API from '../callAPI';

class NewChallenge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Marathon Qualifying',
      image: 'runner.svg',
      start: '2016-12-31T23:00:00.000Z',
      end: '2017-12-30T23:00:00.000Z',
      goal: 1,
      unit: 'workout',
      activity: 'RUNNING',
      description: 'Run one marathon in less than 4 hours',
      rewards: 100
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitNewChallenge = this.submitNewChallenge.bind(this);
  }


  submitNewChallenge() {
    console.log('Submitting ', this.state);
    API.postRequest('/api/organization/challenges', this.state).then(() => browserHistory.push('/organization'));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(target);
    const name = target.id || target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <OrgLayout>
        <div className="new-challenge-container">
          <Breadcrumb className="fcTextInput">
            <BreadcrumbItem>
              <Link to="/organization">Challenges</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <h3> Create a Challenge</h3>
          <hr />
          <div className="newChallengeSplitView" >
            <div className="newChallengeDescription">
              <p>Challenges are a collection of fitness related workouts
                between a specified period for a given reward.
              </p>
            </div>
            <div className="newChallengeFormContainer">
              <FormGroup className="fcTextInput" legendText="Challenge Title">
                <TextInput
                  className="fcTextInput"
                  id="title"
                  placeholder={this.state.title}
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup className="fcTextInput" legendText="Type of Challenge">
                <Select
                  className="fcTextInput"
                  id="activity"
                  defaultValue={this.state.activity}
                  onChange={this.handleInputChange}
                >
                  <SelectItem value="CYCLING" text="CYCLING" />
                  <SelectItem value="RUNNING" text="RUNNING" />
                  <SelectItem value="STAIRS" text="STAIRS" />
                  <SelectItem value="ANY" text="ANY" />
                </Select>
              </FormGroup>

              <FormGroup className="fcTextInput" legendText="Description">
                <TextArea
                  className="fcTextInput"
                  id="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup className="fcTextInput" legendText="Challenge Duration">
                <TextInput
                  className="fcTextInput"
                  id="start"
                  labelText="Start Date"
                  value={this.state.start}
                  onChange={this.handleInputChange}
                />
                <TextInput
                  className="fcTextInput"
                  id="end"
                  labelText="End Date"
                  value={this.state.end}
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup className="fcTextInput" legendText="Goal">
                <p>
                  Number of Workouts
                </p>
                <TextInput
                  className="fcTextInput"
                  id="goal"
                  label="Number of Workouts"
                  type="number"
                  value={this.state.goal}
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <FormGroup className="fcTextInput" legendText="Rewards">
                <p>
                  Reward tokens in the system
                </p>
                <TextInput
                  className="fcTextInput"
                  id="rewards"
                  label="Rewards"
                  type="number"
                  value={this.state.rewards}
                  onChange={this.handleInputChange}
                />
              </FormGroup>

              <Button onClick={this.submitNewChallenge}>Submit</Button>
            </div>
          </div>
        </div>

      </OrgLayout>
    );
  }
}

export default NewChallenge;
