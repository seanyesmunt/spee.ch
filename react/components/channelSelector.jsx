import React from 'react';

const LOGIN = 'login';
const CREATE = 'create';

class ChannelLoginForm extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>
        <h4>Channel Login Form</h4>
      </div>
    );
  }
}

class ChannelCreateForm extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>
        <h4>Create Channel Form</h4>
      </div>
    );
  }
}

class ChannelSelector extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayCreateOrLogin: LOGIN,
    };
    this.toggleCreateOrLogin = this.toggleCreateOrLogin.bind(this);
  }
  toggleCreateOrLogin (event) {
    const selectedOption = event.target.selectedOptions[0].value;
    if (selectedOption === 'login') {
      this.setState({ displayCreateOrLogin: LOGIN });
    } else {
      this.setState({ displayCreateOrLogin: CREATE });
    }
  }
  render () {
    return (
      <div>
        { this.props.publishToChannel && (
          <div className="row row--padded row--no-top row--no-bottom row--wide">

            <p id="input-error-channel-select" className="info-message-placeholder info-message--failure">{this.props.channelError}</p>

            <div className="column column--3">
              <label className="label" htmlFor="channel-name-select">Channel:</label>
            </div><div className="column column--7">
              <select type="text" id="channel-name-select" className="select select--arrow" onChange={this.toggleCreateOrLogin}>
                { this.props.loggedInChannel && <option value={this.props.loggedInChannel} id="publish-channel-select-channel-option">{this.props.loggedInChannel}</option> }
                <option value="login">Existing</option>
                <option value="create">New</option>
              </select>
            </div>

            { (this.state.displayCreateOrLogin === LOGIN) ? <ChannelLoginForm /> : <ChannelCreateForm /> }

          </div>
        )}
      </div>
    );
  }
}

module.exports = ChannelSelector;
