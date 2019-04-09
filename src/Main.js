import React from 'react';
import ReactDOM from 'react-dom';

import { formatAmount } from './utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt } from '@fortawesome/free-solid-svg-icons';

const API = 'https://api.github.com/search/issues';
class Search extends React.Component {
    constructor(){
        super()
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
                        onChange={this.setQ.bind(this)}
                    />
                </div>
            </div>
        </form>
      );
    }
    setQ(e){
        this.state.q = e.target.value
    }
    componentDidMount(){
        this.props.fetchGithub(this.state);  
    }
    handleForm(e) {
      e.preventDefault();
      this.props.fetchGithub(this.state);
    }
};

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q: '',
            current: 'issues',
            issues: [],
            repositories: [],
            gists: [],
            users: [],
            notFound: '' 
        };
    }
    fetchGithub(search) {
        let q = search.q;
        this.setState({q: q})
        // will call to proper api from here based on state current params
        let url = `${API}?q=${q}`;
        fetch(url).
        then(res => res.json()).
        then(data => {
          console.log(data);
          this.setState({
            issues: data
          })
        }).
        catch(error => console.log('Oops! . There Is A Problem', error));
    }
    render() {
        let data = this.state[this.state.current];
        console.log(data);
        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">
                        Github Search
                    </h1>
                    <div className="columns">
                        <div className="column">
                            <Search fetchGithub={this.fetchGithub.bind(this)}></Search>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column tabs">
                            <ul>
                                <li className="is-active"><a>Issues</a></li>
                                <li><a>Repositories</a></li>
                                <li><a>Gists</a></li>
                                <li><a>Users</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <h2 className="title">
                                Issues
                            </h2>
                            <div className="content">
                                    {
                                    data.items && data.items.map((single)=>{
                                    return <div className="box" key={single.id}>
                                    <a href={single.html_url} target="_blank" className="has-text-dark">                                    <article className="media">
                                      <div className="media-left">
                                        <figure className="image is-64x64">
                                          <img src={single.user.avatar_url} alt="Image" />
                                        </figure>
                                      </div>
                                      <div className="media-content">
                                        <div className="content">
                                         
                                            <small>@{single.user.login}</small> at <small>{single.created_at}</small>
                                            <br />
                                            <div className="subtitle">
                                                {single.title}
                                            </div>
                                            {single.body}
                                         
                                        </div>
                                        
                                      </div>
                                    </article>
                                    </a>

                                  </div>
                                })
                                }
                            </div>
                            <nav className = "pagination  is-centered" role = "navigation" aria-label = "pagination" >
                                <a className = "pagination-previous" title = "This is the first page" disabled > 
                                Previous </a> 
                                <a className = "pagination-next" > Next page </a> 
                                <ul className = "pagination-list" >
                                <li >
                                <a className = "pagination-link is-current"  aria-label = "Page 1"  aria-current = "page" > 1 </a> 
                                </li> <li>
                                <a className = "pagination-link" aria-label = "Goto page 2" > 2 </a> 
                                </li> 
                                <li>
                                <a className = "pagination-link"
                            aria-label = "Goto page 3" > 3 </a> </li> </ul> 
                                </nav>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
