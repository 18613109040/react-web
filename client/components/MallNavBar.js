import React, {Component,PropTypes} from "react";
import {  NavBar, Icon,SearchBar} from 'antd-mobile';
class MallNavBar extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	constructor(props) {
		super(props);
		this.state = {
			search:false	
		}
		this.searchIconClick = this._searchIconClick.bind(this);
		this.onChange = this._onChange.bind(this);
	}
	_searchIconClick(){
		this.setState({
			search:!this.state.search
		})
	}
	_onChange(){
		
	}
	render() {
		return(
				<div className="mall-nav-bar">
			    <NavBar 
			    	mode="dark" 
			    	onLeftClick={() => console.log('onLeftClick')}
			      rightContent={
			        this.state.search?
			        "":<Icon
			        	key="0"
			        	type="search" 
			        	className="search-icon" 
			        	onClick={this.searchIconClick}
			        />
			      }
			    >{this.state.search?
			    	<SearchBar
			        placeholder="搜索"
			        onSubmit={value => console.log(value, 'onSubmit')}
			        onClear={value => console.log(value, 'onClear')}
			        onFocus={() => console.log('onFocus')}
			        onBlur={() => console.log('onBlur')}
			        onChange={this.onChange}
			      />:"navbar"}</NavBar>
			  </div>
		)	
	}
}
export default MallNavBar