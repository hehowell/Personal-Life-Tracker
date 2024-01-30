import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import sportsOptions from '../sports-options';

export default class CreateExercise extends Component {

    

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDistance = this.onChangeDistance.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        


        this.state = {
            username: '',
            description: '',
            duration: 0,
            distance: 0.0,
            unit: '',
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/users/')
        .then(response => {
            console.log(response.data)
            if(response.data.length > 0){
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDistance(e) {
        this.setState({
            distance: e.target.value
        });
    }

    onChangeUnit(e) {
        this.setState({
            unit: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            distance: this.state.distance,
            unit: this.state.unit,
            date: this.state.date
        }

        console.log(exercise)

        axios.post('http://localhost:3000/exercises/add', exercise)
            .then(res => console.log(res.data));

        window.location = '/'
    }

    
    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select useref="userInput"
                            required
                            className='form-control'
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {  
                            // getting options from user array using JS
                            // map returns each user in the array
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value = {user}> 
                                        {user}
                                        </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <select
                            useref="descriptionInput"
                            required
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        >
                            <option value="" disabled>Select Activity</option>
                            {Object.keys(sportsOptions).map((category) => (
                                <optgroup label={category.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")} key={category}>
                                    {sportsOptions[category].map((sport) => (
                                        <option key={sport} value={sport}>
                                            {sport}
                                        </option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Duration: </label>
                        <input type="text"
                           required
                           className='form-control'
                           value={this.state.duration}
                           onChange={this.onChangeDuration}/>
                    </div>
                    <div className='form-group'>
                        <label>Distance: </label>
                        <div className='input-group'>
                            <input
                                type="text"
                                required
                                className='form-control'
                                value={this.state.distance.value}
                                onChange={this.onChangeDistance}
                            />
                            <select useref="unitInput"
                            required
                            className='form-control'
                            value={this.state.unit}
                            onChange={this.onChangeUnit}>
                            <option value="" disabled>Select Unit</option>
                            <option>Miles</option>
                            <option>Kilometers</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type="submit" value="Create Exercise Log" className='btn btn-primary' />
                    </div>
                </form>
            </div>
        )
    }
}