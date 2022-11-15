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
  // https://unstats.un.org/SDGAPI/swagger/#!/Goal/V1SdgGoalListGet
  // const url = BASE_URL + method;
  const url = BASE_URL + "v1/sdg/Goal/List";
  // console.log('API: ' , url);
  //hämta ner data via fetch. Await gör att den asynkrona funktionen jobba i fetch
  const response = await fetch(url);
  // console.log(response);
  //Gör om data till ett objekt via json
  const data = await response.json();

  console.log("data: ", data);

  for (const goal of data) {
    //console.log(goal.code);
    let subGoals = await getUnSubgoals(goal.code);
    // console.log(subGoals);
    let li = document.createElement("li");
    let details = document.createElement("details");
    let summary = document.createElement("summary");

    listOfGoals.appendChild(li);
    li.appendChild(details);
    details.appendChild(summary);
    summary.innerText = goal.title;
    // listOfGoals.innerHTML += `<li><details>
    // <summary >${goal.title}</summary>`
    // console.log(subGoals[0]);
    subGoals[0].forEach((e, i) => {
      console.log(i);
      let p = document.createElement("p");
      p.innerText = e.description;
      details.appendChild(p);
      // console.log(listOfGoals.childNodes[i].childNodes[0]);
      // listOfGoals.childNodes[1].childNodes[0].innerHTML += `${e.description}`
      // console.log(e.description);
    });

    // listOfGoals.innerHTML += `</details></li>`
    // ${getUnSubgoals(goal.code)}
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
  // console.log('data :', data);
  return targetsArr;
}
