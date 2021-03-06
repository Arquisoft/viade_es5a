import React, { Component } from 'react';
import { ListBox } from 'primereact/listbox';
import { FriendService } from '@services';
import {List} from './list-friends.style';

export class ListFriends extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  componentDidMount() {
    FriendService.getAll(false)
      .then(list => {
        if (list) {
          list = list.filter(i => i !== null && i !== undefined);
          this.setState({ friends: list });
        }
      }).catch(err => console.error(err));
  }

  selectFriend(e) {
    this.setState({ selected: e.value })
    this.props.selected(e.value);
  }

  render() {
    return (
      <List>
        {this.state.friends &&
          <ListBox className='lista' value={this.state.selected} options={this.state.friends} onChange={(e) => this.selectFriend(e)} multiple={true} optionLabel="webId" />}
      </List>
    );
  }
}

export default ListFriends;