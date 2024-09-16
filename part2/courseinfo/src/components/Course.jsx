const Header = (props) => {
  return <h1>{props.name}</h1>
}

const Content = (props) => {
  return (
  <div>
    {props.parts.map(part => (
      <Part part={part} key={part.id}/>
      ))}
  </div>
  )
}
const Part = (props) => {
  return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  const sumExercises = props.parts.reduce((acc, curr) => curr.exercises + acc, 0)
  return (
    <p><strong>total of {sumExercises} exercises</strong></p>
  )
}

const Course = (props) => {
  return (
    <div>
      {props.courses.map(course => (
        <div key={course.id}> 
          <Header name={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </div>
      ))}
    </div>
  );
}

export default Course
