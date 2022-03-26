const SubHeader = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) =>
    <p>
        <b>total of exercises {sum}</b>
    </p>

const Part = ({ part }) =>
    <p key={part.id}>
        {part.name} {part.exercises}
    </p>


const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </>
    );
}

const Course = ({ course }) => {
    const initialValue = 0;

    return (
        <>
            <SubHeader course={course.name} />
            <Content parts={course.parts} />
            <Total sum={(course.parts).reduce((previousValue, currentValue) => previousValue + currentValue.exercises, initialValue)} />
        </>
    )
}

export default Course;