import { useState } from "react";
import "./App.css";
import data from "./movies.json";

function App() {
  console.log(data);

  // BONUS pour trier
  const sortedData = data.sort((a, b) => {
    const dateA = a.dateOfRelease.split("-")[0];
    const dateB = b.dateOfRelease.split("-")[0];
    return dateB.localeCompare(dateA);
  });

  const [currentPage, setCurrentPage] = useState(1); //page en cours
  const viewPerPage = 5; // nombre de vues par page
  const lastIndex = currentPage * viewPerPage; // dernier index affiché
  const firstIndex = lastIndex - viewPerPage; // dernier index affiché
  const views = data.slice(firstIndex, lastIndex); // récupère depuis firstIndex à lastIndex non inclus
  // const views = sortedData.slice(firstIndex, lastIndex); //BONUS
  const numberOfPage = Math.ceil(data.length / viewPerPage); // nombre total de pages
  const numbers = [...Array(numberOfPage + 1).keys()].slice(1);

  function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== numberOfPage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  return (
    <div className="App">
      <table className="table border">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {views.map((d, i) => (
            <tr key={i}>
              <td>{formatDate(d.dateOfRelease)}</td>
              <td>{d.nameMovies}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" onClick={previousPage} className="page-link">
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === n ? "active" : ""}`}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => changeCurrentPage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" onClick={nextPage} className="page-link">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
