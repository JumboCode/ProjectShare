import React from 'react';

class ResourceFinder extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeLoc = this.handleChangeLoc.bind(this);
    this.handleChangeRes = this.handleChangeRes.bind(this);
    this.state = {
      locationSelected: false,
      location: "",
      resource: "",
    };
  }

  handleChangeLoc(props) {
    this.setState({
      locationSelected: true,
      location: props.target.value,
    })
  }

  handleChangeRes(props) {
    this.setState({
      resource: props.target.value,
    })
  }

  render() {
    const { locationSelected } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { location } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { resource } = this.state;
    const selectLoc = (
      <div className="FirstSelection">
        <select name="LocationType" location={this.state} onChange={this.handleChangeLoc}>
          <option value="default" selected disabled hidden>Choose Location</option>
          <option value="Tufts">Tufts</option>
          <option value="Sherwood">Sherwood</option>
          <option value="Medford">Medford</option>
        </select>
      </div>
    );
    const selectRes = (
      <div className="SecondSelection">
        <select name="ResourceType" resource={this.state} onChange={this.handleChangeRes}>
          <option value="default" selected disabled hidden>Choose Resource</option>
          <option value="COVID-19">COVID-19</option>
          <option value="default" selected disabled hidden>Choose Resource</option>
          <option value="Woman's Health">Woman&apos;s Health</option>
          <option value="default" selected disabled hidden>Choose Resource</option>
          <option value="LGBT">LGBT</option>
        </select>
      </div>
    );
    let select;

    if (!locationSelected) {
      select = selectLoc;
    } else {
      select = selectRes;
    }

    return (
      <div>
        {select}
      </div>
    );
  }
}

export default ResourceFinder;