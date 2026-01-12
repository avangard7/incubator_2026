const people = [
    {
        name: "Ivan",
        gender: "male",
        age: 18,
    },
    {
        name: "Anna",
        gender: "female",
        age: 17,
    },
    {
        name: "Jessica",
        gender: "female",
        age: 36,
    },
];

const adult = people.filter((person) => {
    // const sex = detectSex(person);
    return person.age === 18 || person.age > 18;
});

console.log(adult);

/*                
 const women = people.find((person) => {
    return person.gender === "female"; 
}); */
