import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="">
      <header className="">
        caskaydia.net
      </header>

      <main>

      <section id="app-introduction">
        <div>Title</div>

        <input type="file" name="guiding-image" accept="image/png, image/jpeg"></input>

      </section>

      </main>
    </div>
  );
}

function APODArticle(props) {
  return (
    <section>
      <article>

        <div>Color palette</div>
        <figure>
          <img alt="One of NASA's many astronomy pictures of the day!"></img>
          <figcaption>the title of the image (smaller) ?</figcaption>
        </figure>

        <div>
          <div>Title</div>
          <div>Date</div>
        </div>

        <p></p>

      </article>
    </section>
  );
}

export default App;
