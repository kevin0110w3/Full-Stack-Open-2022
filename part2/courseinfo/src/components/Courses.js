import Header from './Header';
import Course from './Course';

const Courses = ({ courses }) => {
    return (
        <>
            <Header course="Web development curriculum" />
            {courses.map(course => {
                return (
                    <Course key={course.id} course={course} />
                )
            })
            };
        </>
    )
}

export default Courses;