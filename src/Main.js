import React from 'react';
import ReactDOM from 'react-dom';

import { formatAmount } from './utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'bulma-pagination-react';
import Search from './components/Search'

const API = 'https://api.github.com/search/issues';
export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            q: '',
            current: 'issues',
            perPage: 20,
            currentPage: 1,
            total_count: 1,
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
        let url = `${API}?q=${q}&page=${this.state.currentPage}&per_page=${this.state.perPage}`;
        fetch(url).
        then(res => res.json()).
        then(data => {
          console.log(data);
          this.setState({
            issues: data,
            total_count: data.total_count
          })
        }).
        catch(error => console.log('Oops! . There Is A Problem', error));
    }
    fetchMore(page){
        console.log(page);
        this.setState({currentPage : page}, ()=>{this.fetchGithub(this.state)});
        console.log(page, this.state.currentPage)
        // this.fetchGithub(this.state);
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
                                    <a href={single.html_url} target="_blank" className="has-text-dark" title="Click to visit github issue page">                                    <article className="media">
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
                               {
                            <Pagination
                            className="is-centered"
                        pages={this.state.total_count}
                        currentPage={this.state.currentPage}
                        onChange={this.fetchMore.bind(this)}
                        />
                        }
                      
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
