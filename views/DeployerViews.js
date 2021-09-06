import React from 'react';
import PlayerViews from './PlayerViews';

const exports = {...PlayerViews};

const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

exports.Wrapper = class extends React.Component {
  render() {
    const {content} = this.props;
    return (
      <div className="Deployer">
        <h2>Deployer (Alice)</h2>
        {content}
      </div>
    );
  }
}

exports.SetAmt = class extends React.Component {
  render() {
    const {parent, defaultAmt, standardUnit, defaultPass} = this.props;
    const amt = (this.state || {}).amt || defaultAmt;
    const pass = (this.state || {}).pass || defaultPass;
    return (
      <div>
        Amount:
        <br />
        <input
          type='number'
          placeholder={defaultAmt}
          onChange={(e) => this.setState({amt: e.currentTarget.value})}
        /> {standardUnit}
        <br />
        <br />
        Password:
        <br />
        <input
          type='number'
          placeholder={defaultPass}
          onChange={(e) => this.setState({pass: e.currentTarget.value})}
        />
        <br />
        <br />
        <button
          onClick={() => parent.setAmtAndPass(amt, pass)}
        >Set</button>
      </div>
    );
  }
}

exports.Deploy = class extends React.Component {
  render() {
    const {parent, amt, standardUnit, pass} = this.props;
    return (
      <div>
        Amount (pay to deploy): <strong>{amt}</strong> {standardUnit}
        <br />
        Password: <strong>{pass}</strong>
        <br />
        <button
          onClick={() => parent.deploy()}
        >Deploy</button>
      </div>
    );
  }
}

exports.Deploying = class extends React.Component {
  render() {
    return (
      <div>Deploying... please wait.</div>
    );
  }
}

exports.WaitingForAttacher = class extends React.Component {
  async copyToClipborad(button) {
    const {ctcInfoStr} = this.props;
    navigator.clipboard.writeText(ctcInfoStr);
    const origInnerHTML = button.innerHTML;
    button.innerHTML = 'Copied!';
    button.disabled = true;
    await sleep(1000);
    button.innerHTML = origInnerHTML;
    button.disabled = false;
  }
 
  render() {
    const {ctcInfoStr} = this.props;
    return (
      <div>
        Waiting for Attacher to join...
        <br /> Please give them this contract info:
        <pre className='ContractInfo'>
          {ctcInfoStr}
        </pre>
        <button
          onClick={(e) => this.copyToClipborad(e.currentTarget)}
        >Copy to clipboard</button>
      </div>
    )
  }
}

export default exports;
