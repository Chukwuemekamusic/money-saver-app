import { Suspense } from "react";

const person = (firstName, lastName) => ({
    first: firstName,
    last: lastName
})

console.log(person("John", "Doe"));

const [,second] = ["cooking", "eating", "sleeping", "coding"];
console.log(second);

function MyComponent() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>Hello World</div>
        </Suspense>
    )
}

console.log(MyComponent());