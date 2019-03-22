import React, { Component } from 'react'
import axios from 'axios';
import { UPDATEPROFILE } from '../../Redux/actions/index';
import { Card, CardGroup, ListGroup, ListGroupItem, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import './bookmarks.css';

const mapDispatchToProps = dispatch => {
    return {
            UPDATEPROFILE: updatedInfo => dispatch(UPDATEPROFILE(updatedInfo))
    };
  };

  const mapStateToProps = (state) => {
    return { user: state.user};
  };


class BookmarksComponent extends Component { 
    constructor(props){
        super(props);
        this.state = {
            panel: 1,
            card: 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.mapJobsAsPanels = this.mapJobsAsPanels.bind(this)
        this.switchToCard = this.switchToCard.bind(this)
        this.switchToPanel = this.switchToPanel.bind(this)
        this.formatDate = this.formatDate.bind(this)

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: `/api/user/bookmarks/${this.props.user.username}`,
        }).then(res => {
            console.log(res.data.bookmarks)
            const userBookmarks = res.data.bookmarks
            axios.get(`/api/job/getBookmarks/`, {
                params: {
                    bookmarks: userBookmarks
                }
            }).then(res => {
                console.log(res.data)
                this.setState({
                    bookmarks: res.data
                })
            }
                ).catch(
                    err => console.log(err)
                )
        })
    }


    addBookmark(jobId) {
        console.log(this.props.user.username)
        axios({
            method: 'put',
            url: `/api/user/addbookmark/${jobId}`,
        }).then(res => {
            if(res.code == 200){
                console.log("Bookmarked")
            }
        }).catch(
            err => console.log(err)
        )
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
    
        this.setState({
        [name]: value
        }, () => { console.log(this.state)});
    }

    formatDate(date) {
        var formattedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT)
        return formattedDate
    }

    mapJobsAsPanels() {
        const myBookmarks = this.state.bookmarks
        return (
            myBookmarks.map((bookmark, i) => 
            <div className="jobs-panel" key={i}>
                <span onClick={() => this.addBookmark(bookmark.id)} className="bookmark">
                    <i className="far fa-bookmark"></i>
                </span>
                <span className='format-date'>{this.formatDate(bookmark.createdAt)}</span>
                <span className='format-date'>${bookmark.price}</span>
                <a href={'/listing/' + bookmark.id}>{bookmark.title}</a>
            </div>
            )
        )
    }


    switchToCard() {
        this.setState({
            panel: 0,
            card: 1
        }, () => console.log(this.state))
    }

    switchToPanel() {
        this.setState({
            panel: 1,
            card: 0
        }, () => console.log(this.state))
    }

    render(){
        return(
            <div className='jobs-container'>
                <div className='jobs-component'>
                    <div className='jobs-label'>
                        <h3 className='jobs-header'>Job Bookmarks</h3>
                    </div>
                    <div className="layout">
                    <Button onClick={this.switchToPanel} style={{ marginLeft:"5px", marginRight:"5px" }}>
                        <i className="fas fa-bars"></i>
                    </Button>
                    <Button onClick={this.switchToCard} style={{ marginLeft:"5px", marginRight:"5px" }}>
                        <i className="fas fa-grip-vertical"></i>
                    </Button>
                    </div>
                        {this.state.bookmarks && this.state.panel == true && this.mapJobsAsPanels()}
                    <CardGroup>
                        {this.state.bookmarks && this.state.card == true && this.mapJobsAsCards()}
                        {!this.state.bookmarks && <div>Loading Jobs</div>}
                    </CardGroup>
                </div>
            </div>
        )
    }
}

export const Bookmarks =  connect(mapStateToProps, mapDispatchToProps)(BookmarksComponent)