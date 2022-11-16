// hämta mål från API
// Koppla målen till UL
// Klicka på målet för att läsa mer om det i en ny UL

const BASE_URL = "https://unstats.un.org/SDGAPI/";
const SUBGOALURL =
  "https://unstats.un.org/SDGAPI/v1/sdg/Goal/${code}/Target/List?includechildren=true";
//kopplar till listan
listOfGoals = document.querySelector(".goal-list");

//gör funktionen asynkron pga hanterar mycket data.
async function getUnGoals() {
  const url = BASE_URL + "v1/sdg/Goal/List";

  //hämta ner data via fetch. Await gör att den asynkrona funktionen jobba i fetch
  const response = await fetch(url);

  //Gör om data till ett objekt via json
  const data = await response.json();

  for (const goal of data) {
    let subGoals = await getUnSubgoals(goal.code);

    let li = document.createElement("li");
    let details = document.createElement("details");
    let summary = document.createElement("summary");

    listOfGoals.appendChild(li);
    li.appendChild(details);
    details.appendChild(summary);
    summary.innerText = goal.title;

    subGoals[0].forEach((e) => {
      let p = document.createElement("p");
      p.innerText = e.description;
      details.appendChild(p);
    });
  }
}
getUnGoals();

async function getUnSubgoals(code) {
  const res = await fetch(
    BASE_URL + `v1/sdg/Goal/${code}/Target/List?includechildren=true`
  );
  const data = await res.json();

  const targetsArr = [];
  for (const target of data) {
    targetsArr.push(target.targets);
  }

  return targetsArr;
}
