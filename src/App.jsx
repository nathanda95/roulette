import React, { useState } from "react";
import "./App.css";

const App = () => {
  const names = ['Rohan 2', 'Augustin', 'Mailys', 'Nathan', 'Alban', 'Tom'];
  const [excludedNames, setExcludedNames] = useState([]);
  const SLOT_HEIGHT = 150;

  const getAllowedNames = () => {
    return names.filter(name => !excludedNames.includes(name));
  };

  const handleExclusionChange = (event) => {
    const name = event.target.value;
    setExcludedNames(prev => 
      event.target.checked ? [...prev, name] : prev.filter(n => n !== name)
    );
  };

  const createRollerContent = (finalName, otherNames, repeat = 10) => {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < repeat; i++) {
      otherNames.forEach(name => {
        const div = document.createElement('div');
        div.className = 'name';
        div.textContent = name;
        frag.appendChild(div);
      });
    }
    for (let i = 0; i < 5; i++) {
      const finalDiv = document.createElement('div');
      finalDiv.className = 'name';
      finalDiv.textContent = finalName;
      frag.appendChild(finalDiv);
    }
    return frag;
  };

  const spin = () => {
    const allowedNames = getAllowedNames();
    if (allowedNames.length < 3) {
      alert("Au moins 3 personnes doivent être disponibles pour le tirage !");
      return;
    }

    const shuffled = [...allowedNames].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    const durations = [2000, 2500, 3000];

    selected.forEach((finalName, index) => {
      const roller = document.getElementById(`roller${index + 1}`);
      const otherNames = allowedNames.filter(n => n !== finalName);

      roller.innerHTML = '';
      const spinContent = createRollerContent(finalName, otherNames, 10);
      roller.appendChild(spinContent);

      roller.style.transition = 'none';
      roller.style.top = '0px';

      setTimeout(() => {
        const totalItems = (otherNames.length * 10) + 5;
        const offset = -(totalItems - 3) * SLOT_HEIGHT;
        roller.style.transition = `top ${durations[index]}ms ease-out`;
        roller.style.top = `${offset}px`;
      }, 100);
    });
  };

  const pullLever = () => {
    const lever = document.getElementById('leverContainer');
    lever.classList.add('active');
    setTimeout(() => {
      lever.classList.remove('active');
      spin();
    }, 500);
  };

  return (
    <div>
      <h1>🎰 Machine à Sous des Responsables 🎰</h1>
      
      <div id="gameArea">
        <div id="slots">
          <div className="slot">
            <div className="role">CR</div>
            <div className="roller" id="roller1"></div>
          </div>
          <div className="slot">
            <div className="role">Temps</div>
            <div className="roller" id="roller2"></div>
          </div>
          <div className="slot">
            <div className="role">Feed-back</div>
            <div className="roller" id="roller3"></div>
          </div>
        </div>

        <div id="leverContainer" onClick={pullLever}>
          <div id="leverTrack"></div>
          <div id="leverHandle"></div>
        </div>
      </div>

      <h2>Exclure des personnes du tirage :</h2>
      <div id="exclusionList">
        {names.map((name) => (
          <label key={name}>
            <input 
              type="checkbox" 
              value={name} 
              onChange={handleExclusionChange} 
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default App;
