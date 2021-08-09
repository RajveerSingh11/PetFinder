

const List = document.getElementById('petList');
const searchBar = document.getElementById('searchBar');
let pets = [];
let sortedPets = [];
let minAgeFilter = [];
let AgeFilter = [];


/**
 * fetches & parses .JSON file
 * displays error if any
*/
const loadPets = async () => {
    try {
        const res = await fetch('https://60d075407de0b20017108b89.mockapi.io/api/v1/animals');
        pets = await res.json();
        displayPets(pets);
    } catch (err) {
        console.error(err);
    }
};
loadPets();


/**
 * Performs Dynamic Search
 * e used to get value from html console
 * searchString stores value
 * filteredPets stores filtered objects
 */
 searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredPets = pets.filter((pet) => {
      return (
          pet.name.toLowerCase().includes(searchString)
      );
  });
  displayPets(filteredPets);
});


/**
 * used to calculate pets' age while sorting and filtering
 * @param {*} DoB stores pets Date of Birth
 * @returns age of pet in Months (relevant to the given case)
 * diff given in milliseconds so converted to months.
 */
 function getAge(DoB) {
  var ageInMonths = (Date.now()-Date.parse(DoB))/(86400*1000*30);
  return ageInMonths;
}


/**
 * displays Array objects as list items
 * getAge() calculates age (in months)from pets DoB
 */
const displayPets = (pets) => {
    const htmlString = pets
        .map((pet) => {
            return `
            <li class="petCard">
                <h3>${pet.name}</h3>
                <h5>Age: ${Math.floor(getAge(pet.bornAt.substring(0,10)))} Months</h5>
            </li>
        `;
        })
        .join('');
    petList.innerHTML = htmlString;
};


/**
 * called when sort Asc is clicked
 * sorts pets in order of their DoB
 * new Date() parses string to date
 * sortedPets stores newly sorted array
 */
function sortAsc() {
  const sortedPets = pets.sort(function(a,b){
    return new Date(b.bornAt.substring(0,10)) - new Date(a.bornAt.substring(0,10));
  });
  displayPets(sortedPets);
}

/**
 * called when sort Dsc is clicked
 * sorts pets in desc order of DoB
 */
function sortDsc() {
  const sortedPets = pets.sort(function(a,b){
    return new Date(a.bornAt.substring(0,10)) - new Date(b.bornAt.substring(0,10));
  });
  displayPets(sortedPets);
}


/**
 * Performs Dynamic Filtering
 * min used to get value from html console
 * minAge stores value
 * minAgeFilter stores objects with age greater than minAge
 */
minAge.addEventListener('keyup', (min) => {
  const minAge = min.target.value;
  minAgeFilter = pets.filter((pet) => {
      return (
        (getAge(pet.bornAt.substring(0,10))>=minAge)
      );
  });
  displayPets(minAgeFilter);
});

/**
 * Performs Dynamic Filtering
 * max used to get value from html console
 * maxAge stores value
 * ageFilter stores objects with age greater than minAge & less than maxAge
 */
maxAge.addEventListener('keyup', (max) => {
  const maxAge = max.target.value;

  ageFilter = minAgeFilter.filter((pet) => {
      return (
        (getAge(pet.bornAt.substring(0,10))<=maxAge)
      );
  });
  displayPets(ageFilter);
});







