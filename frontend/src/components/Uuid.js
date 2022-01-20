import "../App.css";
import React from "react";

import { ApodArticle } from "./Home";
import { Introduction, Header } from "../App";
const url = "http://localhost:8000";

class Uuid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPresent: false,
      data: [],
      uuid: this.props.match.params["uuid"],
    };
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + `/api/${this.state.uuid}`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const rawdata = xhr.responseText;
        const parsedData = JSON.parse(rawdata);
        console.log(parsedData);
        if (parsedData.length !== 2) {
          console.log("error fetching data!");
        } else {
          this.setState({
            dataPresent: true,
            link: parsedData[0],
            data: parsedData[1],
          });
        }
      }
    };
  }

  render() {
    const shareURL = `/${this.state.link}`;

    return (
      <div className="">
        <Header homepage={false} />
        <main>
          <Introduction>
            <div>
              <div className="title-font">Welcome!</div>
              <div className="body-font">
                You're exploring someone else's adventure.
              </div>
            </div>
          </Introduction>

          {this.state.dataPresent && (
            <section className="flex flex-col">
              <div className="flex flex-col gap-l">
                {this.state.dataPresent &&
                  this.state.data.map((x, i) => {
                    return <ApodArticle entry={x} delay={i} key={i} />;
                  })}
              </div>
            </section>
          )}
        </main>

        {this.state.dataPresent && (
          <footer className="flex flex-col gap-m">
            <div id="footer-caption">Share your discoveries.</div>
            <p>
              url: <a href={shareURL}>https://caskaydia.com{shareURL}</a>
            </p>
          </footer>
        )}
      </div>
    );
  }
}

export default Uuid;
