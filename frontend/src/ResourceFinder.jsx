import React from 'react';

class ResourceFinder extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeLoc = this.handleChangeLoc.bind(this);
    this.handleChangeRes = this.handleChangeRes.bind(this);
    this.state = {
      locationSelected: false,
      resourceSelected: false,
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
      resourceSelected: true,
      resource: props.target.value,
    })
  }

  render() {
    const { locationSelected } = this.state;
    const { resourceSelected } = this.state;
    const { location } = this.state;
    const { resource } = this.state;
    let select;

    if (!locationSelected) {
      select = (
        <select name="LocationType" location={this.state} onChange={this.handleChangeLoc}>
          {/* <option value=""> </option> */}
          <option value="Tufts">Tufts</option>
          <option value="Sherwood">Sherwood</option>
          <option value="Medford">Medford</option>
        </select>
      );
    } else {
      select = (
        <select name="ResourceType" resource={this.state} onChange={this.handleChangeRes}>
          {/* <option value=""> </option> */}
          <option value="COVID-19">COVID-19</option>
          <option value="Woman's Health">Woman&apos;s Health</option>
          <option value="LGBT">LGBT</option>
        </select>
      );
    }

    // This is for testing purposes to make sure that our values are stored correctly
    if (resourceSelected) {
      select = 
      (
        <p>
          {location}
          {resource}
        </p>
      );
    }

    return (
      <div>
        {select}
      </div>
    );
  }
}

export default ResourceFinder;