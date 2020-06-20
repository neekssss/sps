// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Adds a random greeting to the page.
function addRandomGreeting() {
  const greetings =
      ['"Wheres my super suit!?" ~Frozone', '"You sly dog! You got me monologuing!" ~Syndrome', '"No capes！" ~Edna Mode', '"This is a hobo suit, darling." ~Edna Mode'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function getHelloMessage() {
  fetch('/data').then(response => response.json()).then((messages) => {
    
    console.log(messages);

    if (messages.length > 0) {
        // Build the list of comments.
        const statsListElement = document.getElementById('history');
        messages.forEach((line) => {
            statsListElement.appendChild(createListElement(line));
        });
    }
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}

/** Creates a chart and adds it to the page. */
function drawChart() {
  fetch('/vote-data').then(response => response.json())
  .then((animalVotes) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Animal');
    data.addColumn('number', 'Votes');
    Object.keys(animalVotes).forEach((animal) => {
      data.addRow([animal, animalVotes[animal]]);
    });

    const options = {
      'title': 'Favorite Pets/Animals',
      'width':600,
      'height':500
    };

    const chart = new google.visualization.ColumnChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}
