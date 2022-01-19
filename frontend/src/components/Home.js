import "../App.css";
import ColorThief from "colorthief";
import React from "react";

const colorThief = new ColorThief();

const url = "http://localhost:8000";
const local = "http://localhost:3000";

import { withCookies, Cookies } from "react-cookie";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      paletteRaw: [],
      paletteLoaded: false,
      selectedPhoto: null,
      dataPresent: false,
      data: [],
    };

    // Image element reference
    this.imgRef = React.createRef();
    this.handlePaletteLoad = this.handlePaletteLoad.bind(this);
    this.setSelectedPhoto = this.setSelectedPhoto.bind(this);
    this.fetchAPOD = this.fetchAPOD.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handlePaletteLoad(palette) {
    const p = palette.map((x, i) => {
      return <ColorPreview palette={x} key={i} name="color-tile" />;
    });

    this.setState({
      palette: p,
      paletteRaw: palette,
      paletteReady: true,
    });
  }

  setSelectedPhoto(file) {
    this.setState({ selectedPhoto: URL.createObjectURL(file) });
  }

  resetState() {
    this.setState({
      palette: [],
      paletteRaw: [],
      paletteLoaded: false,
      selectedPhoto: null,
      dataPresent: false,
      data: [],
    });
  }

  fetchAPOD() {
    if (this.state.paletteRaw.length === 0) {
      console.error("Palette not loaded.");
    }

    console.log(this.state.paletteRaw);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/api/imgcmp");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify(this.state.paletteRaw));

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const rawdata = xhr.responseText;
        const parsedData = JSON.parse(rawdata);
        console.log(parsedData);
        this.setState({
          dataPresent: true,
          link: parsedData[0],
          data: parsedData[1],
        });
      }
    };
  }

  render() {
    const loadPreview = this.state.selectedPhoto != null;

    const titleprompt = !this.state.dataPresent
      ? "Start your journey."
      : "Explore your results!";

    const caption = !this.state.dataPresent
      ? "Please select an image to inspire your space exploration."
      : "";

    const shareURL = `/${this.state.link}`;

    return (
      <div className="">
        <header className="flex">caskaydia</header>

        <main>
          <section id="intro-section" className="flex flex-col">
            <div id="intro-container" className="flex flex-col container">
              <div>
                <div className="title-font">{titleprompt}</div>
                <div className="body-font">{caption}</div>

                {!this.state.dataPresent && (
                  <ImageUpload onFileSelect={this.setSelectedPhoto} />
                )}
                {loadPreview && (
                  <div id="img-loaded">Please scroll down to continue!</div>
                )}
              </div>
            </div>
          </section>

          {loadPreview && (
            <section id="preview" className="flex">
              <div id="preview-container" className=" flex flex-col">
                <div id="apod-caption" className="gap-m title-font">
                  <div>Your selected image:</div>
                </div>
                <div className="color-palette flex margin-y">
                  {this.state.paletteReady && this.state.palette}
                </div>
                <figure>
                  <img
                    ref={this.imgRef}
                    src={this.state.selectedPhoto}
                    alt="Your choice!"
                    className="preview-img"
                    onLoad={() => {
                      const img = this.imgRef.current;
                      this.handlePaletteLoad(colorThief.getPalette(img, 10));
                    }}
                  ></img>
                </figure>
                <p>
                  The color scheme of this image will be used to find similar
                  images from a set of NASA's astronomy photos of the day.
                </p>
                <div>
                  {!this.state.dataPresent && (
                    <button
                      className="btn btn-outline-dark"
                      onClick={this.fetchAPOD}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {this.state.dataPresent && (
            <section className="flex flex-col">
              <div className="section-title flex gap-m title-font">
                <div>Your guided tour of space:</div>
              </div>
              <div className="flex flex-col gap-l">
                {this.state.dataPresent &&
                  this.state.data.map((x, i) => {
                    return <ApodArticle entry={x} delay={i} key={i} />;
                  })}
              </div>
              {this.state.dataPresent && <Reset onReset={this.resetState} />}
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

function ImageUpload({ onFileSelect }) {
  const handleUpload = (e) => {
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="margin-y font-small">
      <input
        className="font-small btn btn-outline-dark file-select"
        type="file"
        name="guiding-image"
        accept="image/png, image/jpeg"
        title=""
        onChange={handleUpload}
      ></input>
    </div>
  );
}

class ApodArticle extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      entry: props.entry,
      palette: [],
      paletteReady: false,
      liked: false,
    };

    this.style = {
      opacity: "0",
      animationDelay: `${this.props.delay}s`,
      animationName: "fade-in",
      animationTimingFunction: "linear",
      animationDuration: "1.4s",
      animationFillMode: "forwards",
    };

    // Image element reference
    this.imgRef = React.createRef();
    this.handlePaletteLoad = this.handlePaletteLoad.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  handlePaletteLoad(palette) {
    const p = palette.map((x, i) => {
      return <ColorPreview palette={x} key={i} name="color-tile" />;
    });

    this.setState({
      palette: p,
      paletteReady: true,
    });
  }

  handleLike() {
    this.setState({
      liked: !this.state.liked,
    });
  }

  render(props) {
    if (!this.state.entry) {
      console.error("No entry!");
    }

    const entry = this.state.entry;

    const title = entry["title"];
    const imgurl = entry["hdurl"];
    const date = entry["date"];
    const body = entry["explanation"];

    const likeBtnText = this.state.liked ? "Unlike" : "Like";

    return (
      <article
        style={this.style}
        id="apod-container"
        className=" flex flex-col"
      >
        <div className="color-palette flex margin-y">
          {this.state.paletteReady && this.state.palette}
        </div>
        <figure>
          <img
            ref={this.imgRef}
            id={"img"}
            src={imgurl}
            alt="One of NASA's many astronomy pictures of the day!"
            className="apod-img"
            onLoad={() => {
              const img = this.imgRef.current;
              this.handlePaletteLoad(colorThief.getPalette(img, 10));
            }}
          ></img>
        </figure>

        <div id="apod-caption" className="gap-m title-font">
          <div>{title}</div>
          <div id="apod-date">{date}</div>
        </div>

        <p>{body}</p>
        <div id="like-btn">
          <button className="btn btn-outline-danger" onClick={this.handleLike}>
            {likeBtnText}
          </button>
        </div>
      </article>
    );
  }
}

function ColorPreview(props) {
  const style = {
    backgroundColor: `rgb(${props.palette[0]}, ${props.palette[1]},${props.palette[2]})`,
    color: "red",
  };

  return <div className={props.name} style={style}></div>;
}

function Reset(props) {
  return (
    <div>
      <button className="btn btn-outline-dark" onClick={props.onReset}>
        Reset
      </button>
    </div>
  );
}

export default Home;
export { ApodArticle };
