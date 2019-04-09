import React from 'react';
import ReactDOM from 'react-dom';

import { formatAmount } from './utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'bulma-pagination-react';
import Search from './components/Search'
import Issues from './components/Issues'
import Repository from './components/Repository'
const API = 'https://api.github.com/search';
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q: '',
            current: 'issues',
            perPage: 20,
            currentPage: 1,
            issues: {total_count:0, items: []},
            repositories: {total_count: 0, items: []},
            gists: [],
            users: [],
            notFound: '' 
        };
    }
    fetchGithub(search) {
        let url = `${API}/${this.state.current}?q=${this.state.q}&page=${this.state.currentPage}&per_page=${this.state.perPage}`;
        fetch(url).
        then(res => res.json()).
        then(data => {
          console.log(data);
          let u = {};
          u[this.state.current] = data;
          this.setState(u)
        }).
        catch(error => console.log('Oops! . There Is A Problem', error));
    }
    fetchMore(page){
        console.log(page);
        this.setState({currentPage : page}, ()=>{this.fetchGithub(this.state)});
        console.log(page, this.state.currentPage)
        // this.fetchGithub(this.state);
    }
    activateTab(which){
        this.setState({current: which});
    }
    render() {
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">
                        Github Search 
                    </h1>
                    <p>
                        ** Issues and Repositories are working for now**
                    </p>
                    <div className="columns">
                        <div className="column">
                            <Search parentSetState={this.setState.bind(this)} fetchGithub={this.fetchGithub.bind(this)}></Search>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column tabs">
                            <ul>
                                <li className={this.state.current === 'issues'?'is-active':null} onClick={()=>{this.setState({current: 'issues'})}}><a>Issues</a></li>
                                <li className={this.state.current === 'repositories' ? 'is-active':null} onClick={()=>{this.setState({current: 'repositories'})}}><a>Repositories</a></li>
                                <li><a>Gists</a></li>
                                <li><a>Users</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="columns">
                
                    
                     {
                         this.state.current == 'issues' &&

                        <Issues parentSetState={(obj) => { this.setState(obj) }} data={this.state.issues} fetchMore={this.fetchMore.bind(this)}></Issues>
                    }
                      {
                          this.state.current == 'repositories' &&
                        <Repository parentSetState={(obj) => { this.setState(obj) }} data={this.state.repositories} fetchMore={this.fetchMore.bind(this)}></Repository>
                        }
                   
                        </div>
                </div>
            </section>
        )
    }
}
