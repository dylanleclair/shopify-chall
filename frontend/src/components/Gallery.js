import "../App.css";
import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import { ApodArticle } from "./Home";
import { Introduction, BasicButton, Header } from "../App";

const url = "https://data.ellaaa.ca";
//const url = "http://127.0.0.1:8000";

/**
 * To finish this off, we'll use cookies to track an array of dates that the user has "liked".
 *
 * The user can then navigate to this page to view said entries.
 */

class Gallery extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    console.log(this.props.match.params["dates"]);
    const d =
      "dates" in this.props.match.params
        ? this.props.match.params["dates"].split("A")
        : cookies.get("liked") || [];

    console.log(d);

    this.state = {
      dates: d,
      dataPresent: false,
      data: [],
      uuid: this.props.match.params["uuid"],
    };
  }

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + `/api/gallery`);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(this.state.dates));

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const rawdata = xhr.responseText;
        const parsedData = JSON.parse(rawdata);
        console.log(parsedData);

        this.setState({
          dataPresent: parsedData.length > 0,
          data: parsedData,
        });
      }
    };
  }

  render() {
    var dates = this.state.dates.join("A");

    const shareURL = `/gallery/${dates}`;

    const caption =
      this.state.dates.length > 0 ? (
        "Scroll down to rediscover the pictures you (or a friend) has liked."
      ) : (
        <span>
          Like some images at the{" "}
          <a id="" href="/">
            homepage
          </a>{" "}
          and come back to view them here!
        </span>
      );

    console.log(this.state.dataPresent);
    return (
      <div className="">
        <Header homepage={false} />

        <main>
          <Introduction>
            <div>
              <div className="title-font">Your Gallery</div>
              <div className="body-font">{caption}</div>
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
              <a href="/gallery">
                <BasicButton text={"Refresh"} />
              </a>
            </section>
          )}
        </main>

        {this.state.dataPresent && (
          <footer className="flex flex-col gap-m">
            <div id="footer-caption">Share your gallery.</div>
            <p>
              url: <a href={shareURL}>https://caskaydia.com{shareURL}</a>
            </p>
            <div id="footer-caption">
              A Website By Dylan Leclair using the NASA API
            </div>
          </footer>
        )}
      </div>
    );
  }
}

export default withCookies(Gallery);
