import React from 'react';
import ReactDOM from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt } from '@fortawesome/free-solid-svg-icons';
import Pagination from 'bulma-pagination-react';


class Repository extends React.Component {
    constructor(props){
        super(props)
        // we will have more form elements like select box for other input criteria for github search
        this.state = {
            currentPage: 1,
        };
    }
    render() {
      return (
        <div className="column">
                            <h2 className="title">
                                Repository
                            </h2>
                            <div className="content">
                                    {
                                    this.props.data.items && this.props.data.items.map((single)=>{
                                    return <div className="box" key={single.id}>
                                    <a href={single.html_url} target="_blank" className="has-text-dark" title="Click to visit github issue page">                                    <article className="media">
                                      <div className="media-left">
                                        <figure className="image is-64x64">
                                          <img src={single.owner.avatar_url} alt="Image" />
                                        </figure>
                                      </div>
                                      <div className="media-content">
                                        <div className="content">
                                         
                                            <small>@{single.owner.login}</small> at <small>{single.created_at}</small>
                                            <br />
                                            <div className="subtitle">
                                              {single.name}
                                            </div>
                                              Language: {single.language}<br />
                                              Description: {single.description}
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
                        pages={this.props.data.total_count}
                        currentPage={this.state.currentPage}
                        onChange={(page)=>{this.setState({currentPage: page});this.props.fetchMore(page)}}
                        />
                        }
                      
                        </div>
      );
    }
    componentDidMount(){
        this.props.fetchMore(this.state.currentPage);  
    }
};

export default Repository;