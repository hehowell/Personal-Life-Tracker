import React, {Component} from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';


// functional react component (no state/life cycle methods)
const Exercise = props => {
    return(
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
            </td>
        </tr>
        )
}

export default class ExerciseList extends Component {

    constructor(props) {
        super(props);

        
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []}
    }

    // Load in the exercises before the page loads
    componentDidMount() {
        axios.get('http://localhost:3000/exercises/')
        .then(response => {
            this.setState({ exercises: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:3000/exercises/'+id)
            .then(res => console.log(res.data));

        // check to make sure the id hasn't been deleted
        // checking the _id which is created in the dashboard
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        
        return this.state.exercises.map(currentexercise => {
            // console.log(currentexercise)
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}