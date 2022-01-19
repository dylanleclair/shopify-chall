import logo from "./logo.svg";
import "./App.css";
import ColorThief from "colorthief";
import React from "react";

const colorThief = new ColorThief();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: [],
      paletteLoaded: false,
      selectedPhoto: null,
      dataPresent: false,
    };

    // Image element reference
    this.imgRef = React.createRef();
    this.handlePaletteLoad = this.handlePaletteLoad.bind(this);
    this.setSelectedPhoto = this.setSelectedPhoto.bind(this);
    this.fetchAPOD = this.fetchAPOD.bind(this);
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

  setSelectedPhoto(file) {
    this.setState({ selectedPhoto: URL.createObjectURL(file) });
  }

  fetchAPOD() {
    this.setState({
      dataPresent: true,
    });
  }

  render() {
    const loadPreview = this.state.selectedPhoto != null;

    return (
      <div className="">
        <header className="flex">caskaydia</header>

        <main>
          <section id="intro-section" className="flex flex-col">
            <div id="intro-container" className="flex flex-col container">
              <div>
                <div className="title-font">Start your journey.</div>
                <div className="body-font">
                  Please select an image to inspire your space exploration.
                </div>

                <ImageUpload onFileSelect={this.setSelectedPhoto} />
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
                <div class="color-palette flex margin-y">
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
                  <button
                    className="btn btn-outline-dark"
                    onClick={this.fetchAPOD}
                  >
                    Submit
                  </button>
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
                <ApodArticle delay={1} />
                <ApodArticle delay={2} />
                <ApodArticle delay={3} />
              </div>
            </section>
          )}
        </main>

        <footer className="flex flex-col gap-m">
          <div id="footer-caption">Share your discoveries.</div>
          <p>
            url:{" "}
            <a href="https://dylanleclair.ca">
              https://caskaydia.com/ahsjkahhskjah
            </a>
          </p>
        </footer>
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
  constructor(props) {
    super(props);

    this.state = {
      palette: [],
      paletteReady: false,
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

  render(props) {
    return (
      <article
        style={this.style}
        id="apod-container"
        className=" flex flex-col"
      >
        <div class="color-palette flex margin-y">
          {this.state.paletteReady && this.state.palette}
        </div>
        <figure>
          <img
            ref={this.imgRef}
            id={"img"}
            src="/sample.jpg"
            alt="One of NASA's many astronomy pictures of the day!"
            className="apod-img"
            onLoad={() => {
              const img = this.imgRef.current;
              this.handlePaletteLoad(colorThief.getPalette(img, 10));
            }}
          ></img>
        </figure>

        <div id="apod-caption" className="gap-m title-font">
          <div>Anime Waifu From Space</div>
          <div id="apod-date">1995-08-01</div>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris massa
          nisl, varius sed imperdiet a, vehicula eu leo. Maecenas nisi tellus,
          tristique in sodales et, sodales sit amet metus. Fusce congue ex ut
          ipsum condimentum ultricies. Duis porttitor mi id ligula suscipit
          tincidunt. Integer quis nisi nisl. Duis a nibh sollicitudin, sodales
          nulla vehicula, imperdiet augue. Suspendisse rhoncus sed sapien sed
          commodo. In vel faucibus arcu, ut semper diam. Nulla tincidunt nisl
          nec turpis faucibus vehicula. Donec id malesuada neque, quis tristique
          urna. Sed ut ex auctor, imperdiet lacus in, semper diam. Curabitur
          bibendum luctus tempus. Curabitur vestibulum tempor orci in aliquam.
          Nunc turpis lacus, cursus id tincidunt at, scelerisque et lacus.
        </p>
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

export default App;
