import React from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'bulma-pagination-react';


class Search extends React.Component {
    constructor(props){
        super(props)
        // we will have more form elements like select box for other input criteria for github search
        this.state = {
            q: 'reactjs',
            type: '',
            language: ''

        };
    }
    render() {
      return (
        <form onSubmit={this.handleForm.bind(this)}>
           <div className="field">
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Search keyword + Enter"
                        value={this.state.q}
                        onChange={(e)=>{this.setState({q: e.target.value})}}
                    />
                </div>
            </div>
        </form>
      );
    }
    componentDidMount(){
        this.props.fetchGithub(this.state);  
    }
    handleForm(e) {
      e.preventDefault();
      this.props.fetchGithub(this.state);
    }
};

export default Search;